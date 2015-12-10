module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type": "object",
    "properties": {
        "results": {
            "type": "array",
            "uniqueItems": true,
            "minItems": 1,
            "items": {
                "required": ['user'],
                "properties": {
                    "user": {
                        "type": "object",
                        "properties": {
                            "gender": {
                                "type": "string",
                                "minLength": 1
                            },
                            "name": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "first": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "last": {
                                        "type": "string",
                                        "minLength": 1
                                    }
                                },
                                "required": [
                                    "title",
                                    "first",
                                    "last"
                                ]
                            },
                            "location": {
                                "type": "object",
                                "properties": {
                                    "street": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "city": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "state": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "zip": {
                                        "type": ["string", "number"]
                                    }
                                },
                                "required": [
                                    "street",
                                    "city",
                                    "state",
                                    "zip"
                                ]
                            },
                            "email": {
                                "type": "string",
                                "minLength": 1
                            },
                            "username": {
                                "type": "string",
                                "minLength": 1
                            },
                            "password": {
                                "type": "string",
                                "minLength": 1
                            },
                            "salt": {
                                "type": "string",
                                "minLength": 1
                            },
                            "md5": {
                                "type": "string",
                                "minLength": 1
                            },
                            "sha1": {
                                "type": "string",
                                "minLength": 1
                            },
                            "sha256": {
                                "type": "string",
                                "minLength": 1
                            },
                            "registered": {
                                "type": "number"
                            },
                            "dob": {
                                "type": "number"
                            },
                            "phone": {
                                "type": "string",
                                "minLength": 1
                            },
                            "cell": {
                                "type": "string",
                                "minLength": 1
                            },
                            "BSN": {
                                "type": "string",
                                "minLength": 1
                            },
                            "picture": {
                                "type": "object",
                                "properties": {
                                    "large": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "medium": {
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "thumbnail": {
                                        "type": "string",
                                        "minLength": 1
                                    }
                                },
                                "required": [
                                    "large",
                                    "medium",
                                    "thumbnail"
                                ]
                            }
                        },
                        "required": [
                            "gender",
                            "name",
                            "location",
                            "email",
                            "username",
                            "password",
                            "salt",
                            "md5",
                            "sha1",
                            "sha256",
                            "registered",
                            "dob",
                            "phone",
                            "cell",
                            "picture"
                        ]
                    }
                }
            }
        },
        "nationality": {
            "type": "string",
            "minLength": 1
        },
        "seed": {
            "type": "string",
            "minLength": 1
        },
        "version": {
            "type": "string",
            "minLength": 1
        }
    },
    "required": [
        "results",
        "nationality",
        "seed",
        "version"
    ]
};
