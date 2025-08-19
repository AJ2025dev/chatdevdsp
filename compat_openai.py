import os, types
from openai import OpenAI

_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def _chat_completion_create(**kwargs):
    # strip legacy args new SDK doesn't accept
    for k in ["proxies", "request_timeout", "api_base", "api_type", "api_version"]:
        kwargs.pop(k, None)
    return _client.chat.completions.create(**kwargs)

# Monkey-patch legacy surface
import openai as _legacy
LegacyChatCompletion = types.SimpleNamespace(create=_chat_completion_create)
_legacy.ChatCompletion = LegacyChatCompletion
