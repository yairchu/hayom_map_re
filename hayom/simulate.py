import numpy
import random

def random_result(weights, questions, answer_sets):
    user_answer = numpy.zeros(len(questions))
    for q, answers in enumerate(answer_sets):
        user_answer[q] = random.choice(answers)
    party_scores = numpy.dot(weights, user_answer)
    sorted_results = sorted(
        zip(party_scores, range(len(party_scores))), reverse=True)
    assert(sorted_results[0][0] != sorted_results[1][0])
    return sorted_results[0][1], user_answer

def random_sample(weights, questions, answer_sets, num_runs = 1000):
    answer_sets = [list(answer_sets[question].keys()) for question in questions]
    num_parties = len(weights)
    num_wins = numpy.zeros(num_parties)
    winning_answers_count = {}
    for i in range(num_runs):
        winner_id, answers = random_result(weights, questions, answer_sets)
        num_wins[winner_id] += 1
        for q, a in enumerate(answers):
            key = winner_id, q, a
            winning_answers_count[key] = 1 + winning_answers_count.get(key, 0)
    return num_wins, winning_answers_count
