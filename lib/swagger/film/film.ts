module.exports = {
    "/film": {
            post: {
                tags: ["Film API's"],
                summary: "It will create movie",
                description: "It will create movie",
                operationId: "create_film",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Send Message",
                        required: true,
                        schema: {
                        type: "object",
                        properties: {
                                name: {
                                    type: "string",
                                    example: "Movie name"
                                },
                                description: {
                                    type: "string",
                                    example: "Movie description"
                                },
                                releaseDate: {
                                    type: "date",
                                    example: "2022-01-23"
                                },
                                rating: {
                                    type: "number",
                                    description: "Rating from 1 to 5",
                                    example: 4
                                },
                                ticketPrice: {
                                    type: "number",
                                    description: "Price must be greater than 0",
                                    example: 4
                                },
                                country: {
                                    type: "string",
                                    example: "Pakistan"
                                },
                                genre: {
                                    type: "array",
                                    example: ["action", "drama"]
                                },
                                photo: {
                                    type: "string",
                                    example: "Image url"
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
            },
            get: {
                tags: ["Film API's"],
                summary: "It will fetch all movies",
                description: "It will fetch all movies",
                operationId: "fetch_movies",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "query",
                        name: "page",
                        schema: { type: "string", example: "1" },
                        description: "Fetch movies"
                    },
                    {
                        in: "query",
                        name: "limit",
                        schema: { type: "string", example: "10" },
                        description: "Fetch movies per page limit"
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
    "/film/{slug}": {
            get: {
                tags: ["Film API's"],
                summary: "It will fetch movie by movie slug",
                description: "It will fetch movie by movie slug",
                operationId: "fetch_movie_by_slug",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "slug",
                        schema: { type: "string", example: "movie-name" },
                        description: "Fetch movie by slug"
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

 