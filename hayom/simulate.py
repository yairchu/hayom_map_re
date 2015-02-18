import numpy
import random

def random_result(weights, questions, answer_sets):
    user_answer = numpy.zeros(len(questions))
    for q, answers in enumerate(answer_sets):
        user_answer[q] = random.choice(answers)
    party_scores = numpy.dot(weights, user_answer)
    def key(x):
        score, idx = x
        return -score, idx
    sorted_results = sorted(
        zip(party_scores, range(len(party_scores))), key=key)
    return sorted_results[0][1], user_answer

def random_sample(weights, questions, answer_sets, num_runs = 1000):
    answer_sets = [list(answer_sets[question].keys()) for question in questions]
    num_parties = len(weights)
    num_wins = numpy.zeros(num_parties)
    num_wins_given_answer = {}
    for i in range(num_runs):
        winner_id, answers = random_result(weights, questions, answer_sets)
        num_wins[winner_id] += 1
        for q, a in enumerate(answers):
            key = q, a
            if key not in num_wins_given_answer:
                num_wins_given_answer[key] = numpy.zeros(num_parties)
            num_wins_given_answer[key][winner_id] += 1
    return num_wins, num_wins_given_answer
