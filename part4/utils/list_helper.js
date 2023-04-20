const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, b) => accumulator + b.likes, 0);
}

const favoriteBlogs = (blogs) => {
    if (blogs.length != 0)
        return blogs.reduce((b1, b2) => b1.likes > b2.likes ? b1 : b2);    
    return null;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs
}