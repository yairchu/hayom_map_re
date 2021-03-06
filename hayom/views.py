from hayom import models, parse_source, simulate

import copy
import pickle
import numpy
from django.shortcuts import render

default_version = 'fixed'

def home(request):
    params = []
    version = request.GET.get('version', default_version)
    if version != default_version:
        params.append('version=' + version)

    questions_order, question_titles, answer_sets = parse_source.questions(version)
    party_names, weights = parse_source.parties(questions_order, version)
    svd_parties, svd_vals, svd_questions = numpy.linalg.svd(weights)

    orig_answer_sets = copy.deepcopy(answer_sets)
    for param in request.GET.keys():
        parts = param.split('N')
        if len(parts) != 2:
            continue
        params.append(param)
        q_code = parts[0]
        answer_set = answer_sets[q_code]
        del answer_set[int(parts[1])]
        if not answer_set:
            # No answer allowed for a question
            context = {
                'question': question_titles[q_code],
                }
            return render(
                request, 'hayom/error_all_answers_forbidden.html', context)

    num_runs = 10000

    params.sort()
    params = '&'.join(params)
    try:
        cached_run = models.SimulationResult.objects.get(params = params)
    except models.SimulationResult.DoesNotExist:
        num_wins, num_wins_given_answer = simulate.random_sample(
            weights, questions_order, answer_sets, num_runs)
        cached_run = models.SimulationResult(params = params,
            results = pickle.dumps((num_wins, num_wins_given_answer)))
        try:
            cached_run.save()
        except:
            pass
    else:
        num_wins, num_wins_given_answer = pickle.loads(cached_run.results)

    context = {
        'num_parties': len(party_names),
        'num_cols': 3 + len(party_names),
        'parties': [],
        'questions': [],
        'num_runs': num_runs,
        'version': version,
        'versions': ['2015.2.15'],
        'svd_vals': ['%.1f'%x for x in svd_vals],
        'svd_parties': [],
        'svd_questions': [],
        'num_extra_questions': len(questions_order)-len(party_names),
        'clusters_horiz': [
            {
                'name': 'ימין',
                'parties': ['הליכוד', 'ישראל ביתנו', 'הבית היהודי', 'כולנו', 'העם איתנו'],
            },
            {
                'name': 'מרכז',
                'parties': ['יש עתיד', 'ש״ס', 'יהדות התורה'],
            },
            {
                'name': 'שמאל',
                'parties': ['המחנה הציוני', 'מרצ', 'הרשימה המשותפת'],
            },
            ],
        'clusters_vert': [
            {
                'name': 'חילוני',
                'parties': ['הליכוד', 'ישראל ביתנו', 'יש עתיד', 'המחנה הציוני', 'כולנו', 'מרצ', 'הרשימה המשותפת'],
            },
            {
                'name': 'דתי',
                'parties': ['ש״ס', 'יהדות התורה', 'הבית היהודי', 'העם איתנו'],
            },
            ],
        'cluster_stats': {},
        }
    party_stats = {}
    for p, name in enumerate(party_names):
        chance = num_wins[p]/num_runs
        party_stats[name] = chance
        context['parties'].append({
            'name': name,
            'percent': '%.1f' % (100*chance),
            })
    for clusters in [context['clusters_horiz'], context['clusters_vert']]:
        for cluster in clusters:
            cluster['percent'] = '%.1f' % (
                100 * sum(party_stats[p] for p in cluster['parties']))
    for vert_cluster in context['clusters_vert']:
        vert_set = set(vert_cluster['parties'])
        vert_cluster['intersections'] = []
        for horiz_cluster in context['clusters_horiz']:
            common_set = vert_set.intersection(set(horiz_cluster['parties']))
            if not common_set:
                vert_cluster['intersections'].append('-')
                continue
            vert_cluster['intersections'].append('%.1f%%' %
                (100 * sum(party_stats[p] for p in common_set)))
    for party_name, row in zip(party_names, svd_parties):
        context['svd_parties'].append({
            'name': party_name,
            'weights': ['%d'%(x*100) for x in row],
            })
    for q, col in zip(questions_order, svd_questions[:len(svd_vals)].transpose()):
        if q == 'const' and (abs(col) <= 0.0001).all():
            continue
        answer = orig_answer_sets[q].get(1)
        if answer is None:
            answer = orig_answer_sets[q].get(2)
        if answer is None:
            answer = '-'
        context['svd_questions'].append({
            'code': q,
            'title': question_titles[q],
            'positive': answer,
            'weights': ['%d'%(x*100) for x in col],
            })
    div = num_wins.copy()
    div[div == 0] = 1
    for q_idx, q in enumerate(questions_order):
        if q == 'const' and (weights[:, q_idx] == 0).all():
            continue
        vector = weights[:, q_idx]
        orig_answers = orig_answer_sets[q]
        question = {
            'code': q,
            'title': question_titles[q],
            'num_rows': 1+len(orig_answer_sets[q]),
            'vector': [],
            'answers': [],
            'norm': '%.1f' % (sum(vector**2)*sum(x**2 for x in orig_answers))**0.5,
            }
        for x, party in zip(vector, party_names):
            question['vector'].append({
                'val': '%.3f'%x,
                'party': party
            })
        for k, v in sorted(orig_answers.items()):
            valid_answers = answer_sets[q]
            answer = {
                'val': k,
                'name': v,
                'used': k in valid_answers,
                }
            answer_wins = num_wins_given_answer.get((q_idx, k))
            if answer_wins is not None:
                answer_wins /= sum(answer_wins)
                answer['party_percents'] = [
                    '%.1f' % (100*x) for x in answer_wins / sum(answer_wins)]
            question['answers'].append(answer)
        context['questions'].append(question)
    return render(request, 'hayom/home.html', context)
