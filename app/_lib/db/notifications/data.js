export const populatedQuery = [
    {
        $match: {
            isDeleted: false,
        },
    },
    {
        $sort: {
            createdAt: -1
        }
    },
    {
        $lookup: {
            from: "categories",
            localField: "categories",
            foreignField: "_id",
            as: "categories",
        },
    },
    {
        $lookup: {
            from: "departments",
            localField: "departments",
            foreignField: "_id",
            as: "departments",
        },
    },
    {
        $lookup: {
            from: "groups",
            localField: "groups",
            foreignField: "_id",
            as: "groups",
        },
    },
    {
        $unwind: {
            path: "$locations",
            preserveNullAndEmptyArrays: true,
        },
    },
    {
        $lookup: {
            from: "locations",
            localField: "locations.location",
            foreignField: "_id",
            as: "locations.location",
        },
    },
    {
        $lookup: {
            from: "buildings",
            localField: "locations.buildings",
            foreignField: "_id",
            as: "locations.buildings",
        },
    },
    {
        $addFields: {
            categories: {
                $map: {
                    input: "$categories",
                    in: {
                        $mergeObjects: [
                            "$$this",
                            {
                                id: "$$this._id",
                            },
                        ],
                    },
                },
            },
            departments: {
                $map: {
                    input: "$departments",
                    in: {
                        $mergeObjects: [
                            "$$this",
                            {
                                id: "$$this._id",
                            },
                        ],
                    },
                },
            },
            groups: {
                $map: {
                    input: "$groups",
                    in: {
                        $mergeObjects: [
                            "$$this",
                            {
                                id: "$$this._id",
                            },
                        ],
                    },
                },
            },
            locations: {
                $mergeObjects: [
                    {
                        location: {
                            $map: {
                                input: "$locations.location",
                                in: {
                                    $mergeObjects: [
                                        "$$this",
                                        {
                                            id: "$$this._id",
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    {
                        buildings: {
                            $map: {
                                input: "$locations.buildings",
                                in: {
                                    $mergeObjects: [
                                        "$$this",
                                        {
                                            id: "$$this._id",
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        },
    },

    {
        $group: {
            _id: "$_id",
            services: {
                $first: "$services",
            },
            categories: {
                $first: "$categories",
            },
            departments: {
                $first: "$departments",
            },
            groups: {
                $first: "$groups",
            },
            locations: {
                $push: "$locations",
            },
            isDeleted: {
                $first: "$isDeleted",
            },
            createdAt: {
                $first: "$createdAt",
            },
            updatedAt: {
                $first: "$updatedAt",
            },
            __v: {
                $first: "$__v",
            },
        },
    },
    {
        $addFields: {
            id: "$_id",
            locations: {
                $map: {
                    input: "$locations",
                    in: {
                        $mergeObjects: [
                            "$$this",
                            {
                                location: {
                                    $mergeObjects: [
                                        {
                                            $arrayElemAt: [
                                                "$$this.location",
                                                0,
                                            ],
                                        },
                                        {
                                            id: {
                                                $arrayElemAt: [
                                                    "$$this.location._id",
                                                    0,
                                                ],
                                            },
                                        },
                                    ],
                                },
                                buildings: "$$this.buildings",
                            },
                        ],
                    },
                },
            },
        },
    },
    {
        $project: {
            _id: 0,
            "categories._id": 0,
            "departments._id": 0,
            "groups._id": 0,
            "locations.location._id": 0,
            "locations.buildings._id": 0,
        },
    }
]