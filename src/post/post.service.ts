import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    private posts = [
        {
            id: 1,
            title: "title",
            author: "testAuthor",
            content: "There is my first post here. Welcome to my mini-blog guys.",
            tags: ["greetings", "vlog"]
        },
        {
            id: 2,
            title: "second title",
            author: "another testAuthor",
            content: "There is my first post here. Welcome to my mini-blog guys.",
            tags: ["greetings", "vlog"]
        }
    ]

    public showAllPost() {
        return this.posts   
    }

    public showPostbyTags(tags) {
        return this.posts.filter(post => post.tags.every(tag => tag.includes(tags)))
    }
}
