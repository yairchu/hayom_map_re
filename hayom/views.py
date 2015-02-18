from hayom import models, parse_source, simulate

import copy
import pickle
from django.shortcuts import render

def home(request):
    params = []
    version = request.GET.get('version', 'latest')
    if version != 'latest':
        params.append('version=' + version)

    questions_order, question_titles, answer_sets = parse_source.questions(version)
    party_names, weights = parse_source.parties(questions_order, version)

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
        'num_cols': 2 + len(party_names),
        'parties': [],
        'questions': [],
        'num_runs': num_runs,
        'version': version,
        'versions': ['2015.2.15'],
        }
    for p, name in enumerate(party_names):
        context['parties'].append({
            'name': name,
            'percent': '%.1f' % (100*num_wins[p]/num_runs),
            })
    div = num_wins.copy()
    div[div == 0] = 1
    for q_idx, q in enumerate(questions_order):
        if q == 'const' and (weights[:, q_idx] == 0).all():
            continue
        question = {
            'code': q,
            'title': question_titles[q],
            'num_rows': 1+len(orig_answer_sets[q]),
            'vector': ['%.3f'%x for x in weights[:, q_idx]],
            'answers': []
            }
        for k, v in sorted(orig_answer_sets[q].items()):
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
