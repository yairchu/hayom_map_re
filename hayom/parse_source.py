import numpy
import os
from bs4 import BeautifulSoup

dirname = os.path.dirname(__file__)

def version_dir(version):
    if version == 'fixed':
        version = 'latest'
    return '%s/data/%s' % (dirname, version)

def questions(version):
    '''
    Parse the index.html file of "map and you"
    to extract the list of question titles and possible answers.
    '''
    html_src = BeautifulSoup(open('%s/index.html' % version_dir(version)))

    # 'const' is a special question that corresponds
    # to constants added to the parties scores.
    # the only instance of a non-zero weight for this is 0.01 being subtracted
    # from the arab list party's score in the '2015.2.15' version.
    answer_sets = {'const': {1: '-'}}
    titles = {'const': '-'}
    order = ['const']

    for element in html_src.find_all(type='radio'):
        question_id = element['name']
        answer_set = answer_sets.setdefault(question_id, {})
        val = int(element['value'])
        if val in answer_set:
            # Question m2_3 answers repeat in what seems to be another question
            # Ignore these repetitions.
            continue
        answer_set[val] = element.text.strip()
        if question_id not in titles:
            order.append(question_id)
            question_elem = element
            while True:
                question_titles = question_elem.find_all('h4')
                if question_titles:
                    break
                question_elem = question_elem.parent
            titles[question_id] = question_titles[0].text.strip()
    answer_sets['m4_3'][1] = 'נוטה להסכים*'
    answer_sets['m4_3'][2] = 'מסכים בהחלט*'
    return order, titles, answer_sets

def parties(questions_order, version):
    '''
    Parse the plugins.js of "map and you"
    to extract the list of parties and their question weight matrix.
    '''
    js_src = iter(open('%s/plugins.js' % version_dir(version)))

    questions = set(['const'])
    for line in js_src:
        if line == 'var answers = {\n':
            break
    for line in js_src:
        if line == '};\n':
            break
        questions.add(line.split("'")[1])
    assert questions == set(questions_order)

    parties = []
    name_of_party = {}
    for line in js_src:
        if line == 'var results = {\n':
            break
    for line in js_src:
        if line == '};\n':
            break
        if line.endswith(': {\n'):
            party_code = line.strip().split(':', 1)[0]
            parties.append(party_code)
            line = js_src.__next__()
            name_of_party[party_code] = line.split("'")[1]

    formula_of_party = {}
    for line in js_src:
        if line == "function sortParties() {\n":
            break
        parts = line.strip().rstrip(';').split()
        if not parts:
            continue
        party = parts[0]
        if party not in parties:
            continue
        if len(parts) == 3:
            assert parts[1] == '+='
            formula_of_party[party]['const'] = float(parts[2])
            continue
        assert len(parts) == 5
        if parts[1] == '=':
            formula_of_party[party] = {}
        else:
            assert parts[1] == '+='
        assert parts[3] == '*'
        question = parts[2].split('.')[-1]
        assert question in questions
        formula_of_party[party][question] = float(parts[4])

    # Parties come in a specific order which matters when there is a tie.
    parties_order = []
    for line in js_src:
        prefix = "            partiesObj[parseFloat(this)] = '"
        if not line.startswith(prefix):
            continue
        party_name = line[len(prefix):].split("'", 1)[0]
        parties_order.append(party_name)
    assert set(parties_order) == set(parties)
    del parties

    weights = numpy.zeros([len(parties_order), len(questions)])
    for p, party in enumerate(parties_order):
        for q, question in enumerate(questions_order):
            weights[p, q] = formula_of_party[party][question]

    party_names = [name_of_party[p] for p in parties_order]
    return party_names, weights
