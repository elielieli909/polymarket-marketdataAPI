import json

filedump = ""
with open("polymarket_subgraph_docs.json") as f:
    data = json.load(f)
    types = data['data']['__schema']['types']

    for type in types:
        if "fields" not in type:
            continue
        print(type['name'])
    
        filedump += "## " + type['name'] + '\n'
        for field in type['fields']:
            filedump += "### " + field['name'] + '\n'
            if field['description'] is not None:
                filedump += "* " + field['description'] + '\n'

with open("polymarket_subgraph_docs.md", 'w') as f:
    f.write(filedump)