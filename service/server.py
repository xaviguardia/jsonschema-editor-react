from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from genson import SchemaBuilder
import json
from pydantic import BaseModel

app = FastAPI()

# Permitir CORS para localhost:3000
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class JsonRequest(BaseModel):
    data: str


@app.post("/infer_schema/")
async def infer_schema(request: JsonRequest):
    try:
        the_obj = json.loads(request.data)
        builder = SchemaBuilder()
        builder.add_object(the_obj)
        schema = builder.to_schema()
        return {"schema": schema}
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
