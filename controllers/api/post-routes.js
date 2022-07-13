const router = require('express').Router();
const { User, Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a post
router.post("/", withAuth, (req, res) => {
    Posts.create({
            name: req.body.rcp_name,
            creator_id: req.session.user_id,
            content: req.body.content
        })
        .then((postData) => res.json(postData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a post
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "date_created"],
            // include: [{
            //         model: User,
            //         attributes: ["username"],
            //     },
            //     {
            //         model: Comment,
            //         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            //         include: {
            //             model: User,
            //             attributes: ["username"],
            //         },
            //     },
            // ],
        })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;