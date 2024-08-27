import React, { Children, useState } from 'react'
import './NestedComments.css'

const data = {
    comments: {
        1: {
            id: 1,
            parent: null,
            description: 'hii Guys, how are you',
            children: [2, 3]
        },
        2: {
            id: 2,
            parent: 1,
            description: 'bs yrr sahi h',
            children: []
        },
        3: {
            id: 3,
            parent: 1,
            description: 'chal rahi h jindgi bahi',
            children: [4]
        },
        4: {
            id: 4,
            parent: 3,
            description: 'ha yrr same here',
            children: [5]
        },
        5: {
            id: 5,
            parent: 4,
            description: 'same bhai',
            children: []
        }
    }
}

const PostReplyBox = ({ id, addReply, setShowReplyBox }) => {
    const [reply, setReply] = useState('');
    const postReplyHandler = () => {
        addReply(reply, id)
        setShowReplyBox(false)
    }

    return (
        <div className='text-area-contaier'>
            <div>
                <textarea onChange={(e) => setReply(e.target.value)} className='text-area'>

                </textarea>
            </div>
            <button className='post-reply-button' onClick={postReplyHandler}>Post Reply</button>
        </div>
    )
}
const Comment = ({ comment, allComments, deleteReply, addReply }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    return (
        <>
            <div className='container' >
                <div className='comment-container'>
                    <p>{comment?.description}</p>
                </div>
                <div className='action-buttons'>
                    <p className='reply-button' onClick={() => setShowReplyBox(prev => !prev)}>{showReplyBox ? 'Cancel' : 'Reply'}</p>
                    <p className='delete-button' onClick={() => deleteReply(comment.id)}>Delete</p>
                </div>
            </div>
            {showReplyBox && <PostReplyBox
                id={comment.id}
                addReply={addReply}
                setShowReplyBox={setShowReplyBox}
            />}
            <div className='children-comment'>
                {comment?.children?.map((item, idx) => {
                    return <Comment
                        key={item}
                        addReply={addReply}
                        comment={allComments[item]}
                        allComments={allComments}
                        deleteReply={deleteReply}
                    />
                })}
            </div>

        </>
    )
}
const NestedComments = () => {
    const [comments, setComments] = useState(data.comments)

    const addReply = (reply, id) => {
        const newId = Date.now().toString();
        const newData = { id: newId, description: reply, parent: id, children: [] }
        setComments((prevComments) => {
            const updatedCommets = { ...prevComments, [newId]: newData }
            updatedCommets[id].children.push(newId);
            return updatedCommets;
        })
    }

    const deleteReply = (id) => {
        const parentId = comments[id].parent;
        setComments((prevComments) => {
            const updatedCommets = { ...prevComments };
            if (parentId)
                updatedCommets[parentId].children = updatedCommets[parentId]?.children?.filter((item) => item !== id);
            const queue = [id];
            while (queue?.length) {
                const nodeToDelete = queue.shift();
                queue.push(...updatedCommets[nodeToDelete].children);
                delete updatedCommets[nodeToDelete]
            }
            return updatedCommets
        })
    }

    if (!Object.keys(comments)?.length) {
        return <h1>No Comments</h1>
    } else
        return (
            <div>
                <Comment
                    comment={comments[1]}
                    allComments={comments}
                    addReply={addReply}
                    deleteReply={deleteReply}
                />
            </div>
        )
}

export default NestedComments