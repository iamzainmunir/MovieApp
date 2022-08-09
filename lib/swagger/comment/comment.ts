module.exports = {
    "/comment": {
            post: {
                tags: ["Comment API's"],
                summary: "It will add comment",
                description: "It will add comment",
                operationId: "add_comment",
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Send Message",
                        required: true,
                        schema: {
                        type: "object",
                        properties: {
                                comment: {
                                    type: "string",
                                    example: "Nice movie"
                                },
                                ref_id: {
                                    type: "string",
                                    example: "<movie_ref_id>"
                                }
                            }
                        }
                    }
                ],
                responses: {
                    400: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Invalid input"
                    }
                }
            }
        },

    }

 