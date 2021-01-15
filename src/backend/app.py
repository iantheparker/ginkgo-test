from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from task import search_protein_task
from bio import search_protein_list
import asyncio

app = Flask(__name__)
CORS(app)
api = Blueprint("api", __name__)


@api.route("/")
def homepage():
    return jsonify(
        {
            "intro": "hello there. someday you'll get results from the database. for now..."
        }
    )


@api.route("/searchtask", methods=["POST"])
def search_task():
    if request.method == "POST":
        search_term = request.form["q"]

        result = search_protein_task.delay(search_term)
        print(result.backend)

        return (
            jsonify(
                {
                    "result": result.get(timeout=1, propagate=False)
                    if result.ready()
                    else "pending"
                }
            ),
            200,
        )


@api.route("/search", methods=["POST"])
def search_async():
    if request.method == "POST":
        search_term = request.form["q"]

        result = asyncio.run(search_protein_list(search_term))
        print(result)

        return (
            jsonify({"result": result}),
            200,
        )


app.register_blueprint(api, url_prefix="/api")

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)
