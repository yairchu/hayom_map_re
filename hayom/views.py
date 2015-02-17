from hayom import models, parse_source, simulate

import copy
import pickle
from django.shortcuts import render

def home(request):
    questions_order, question_titles, answer_sets = parse_source.questions()
    party_names, weights = parse_source.parties(questions_order)

    orig_answer_sets = copy.deepcopy(answer_sets)
    params = []
    for param in request.GET.keys():
        parts = param.split('N')
        if len(parts) != 2:
            continue
        params.append(param)
        del answer_sets[parts[0]][int(parts[1])]

    num_runs = 10000

    params.sort()
    params = '&'.join(params)
    try:
        cached_run = models.SimulationResult.objects.get(params = params)
    except models.SimulationResult.DoesNotExist:
        num_wins, winning_answers_count = simulate.random_sample(
            weights, questions_order, answer_sets, num_runs)
        cached_run = models.SimulationResult(params = params,
            results = pickle.dumps((num_wins, winning_answers_count)))
        try:
            cached_run.save()
        except:
            pass
    else:
        num_wins, winning_answers_count = pickle.loads(cached_run.results)

    context = {
        'num_parties': len(party_names),
        'parties': [],
        'questions': [],
        }
    for p, name in enumerate(party_names):
        context['parties'].append({
            'name': name,
            'percent': '%.1f' % (100*num_wins[p]/num_runs),
            })
    div = num_wins.copy()
    div[div == 0] = 1
    for q_idx, q in enumerate(questions_order):
        if q == 'const':
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
                'party_percents': [
                    '%.1f' %
                    (100*winning_answers_count.get((p, q_idx, k), 0)/div[p])
                    for p in range(len(weights))]
                }
            question['answers'].append(answer)
        context['questions'].append(question)
    return render(request, 'hayom/home.html', context)