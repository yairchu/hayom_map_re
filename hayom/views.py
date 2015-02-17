from hayom import parse_source, simulate

from django.shortcuts import render

def home(request):
    questions_order, question_titles, answer_sets = parse_source.questions()
    party_names, weights = parse_source.parties(questions_order)
    num_runs = 1000
    num_wins, winning_answers_count = simulate.random_sample(
        weights, questions_order, answer_sets, num_runs)

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
            'title': question_titles[q],
            'num_answers': len(answer_sets[q]),
            'answers': []
            }
        for k, v in sorted(answer_sets[q].items()):
            answer = {
                'val': k,
                'name': v,
                'party_percents': [
                    '%.1f' %
                    (100*winning_answers_count.get((p, q_idx, k), 0)/div[p])
                    for p in range(len(weights))]
                }
            question['answers'].append(answer)
        context['questions'].append(question)
    return render(request, 'hayom/home.html', context)
