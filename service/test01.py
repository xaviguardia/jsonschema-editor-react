# create a simple json as text name, address, age, phone , preferences (tags)
the_text="""
{
    "name": "John Doe",
    "address": "123 Main St",
    "age": 29,
    "phone": [
        
        {
            "type": "home",
            "number": "212 555-1234"
        },
        {
            "type": "fax",
            "number": "646 555-4567"
        }
    ],
    "preferences": [
        "sports",
        "movies",
        "music"
    ]
}
"""
import json
the_obj=json.loads(the_text)
# now infer the schema using genson
from genson import SchemaBuilder
builder=SchemaBuilder()
builder.add_object(the_obj)
schema=builder.to_schema()
print(schema)

