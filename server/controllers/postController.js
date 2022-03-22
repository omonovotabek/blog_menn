const Post = require('../models/PostModel')

create = async function (req, res)  {
    if(!req.file)
      return res.status(400).json({message:'Faylni to\'gri kiriting'})
      
    try {
    const {title, text, imageUrl} = req.body
    const {path} = req.file
    // console.log(req.file)
    const post = new Post ({title, text, imageUrl})
    post.imageUrl = path
    await post.save()
    res.status(201).json(post)
 } catch (e) {
    res.status(400).json(e.message)
 }
}

getAll = async (req, res) => {
  try {
      const posts = await Post.find().sort({date: -1})
      res.status(200).json(posts)
  } catch (e) {
      res.status(400).json(e.message)
  }
}

getById = async (req, res) => {
   try {
       const {id} = req.params
       const post = await Post.findById({_id:id})
    //    console.log(post)
       res.status(200).json(post)
   } catch (e) {
       res.status(400).json(e.message)
   }
}

update = async (req, res) => {
  try {
      const {id} = req.params
      const {text} = req.body
      const $set = {
          text
      }
      const post = await Post.findOneAndUpdate(
      {_id: id}, {$set}, {new: true}
      )
      res.status(200).json(post)
  } catch (e) {
      res.status(200).json(e.message)
  }
}

remove = async (req, res) => {
  try {
      const {id} = req.params
    //   await Post.deleteOne({_id:id})
    //   res.status(200).json({message: "deleted success"})
      const deletePost = await Post.findByIdAndDelete({_id:id})
      res.status(200).json(deletePost)
  } catch (e) {
      res.status(400).json(e.message)
  }
}

addView = async (req, res) => {
    try {
        const {views} = req.body
        const {id} = req.params
        const $set = {views}
        await Post.findOneAndUpdate(
            {_id: id}, {$set}, {new: true}
        )
        res.status(204).json()
    } catch (e) {
        res.status(400).json(e.message)
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    addView
}