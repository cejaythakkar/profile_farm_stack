def get_response_object(message: str = "", success: bool = False, token: bool = False):
    if token:
        response_object = {
            "message": message,
            "success": success,
            "data": {},
            "token": "",
        }
    else:
        response_object = {"message": message, "success": success, "data": {}}

    return response_object
