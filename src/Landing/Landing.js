import React from 'react'
import './Landing.css'

export default class Landing extends React.Component{
    render() {
        return(
            <div class="landing">
            <h1>How to use the website</h1>
            <p>Welcome to Fanio! In order to create an account, go to the account
                page. This idea of this website is for folk who are fans of books, tv shows, movies, etc. to 
                keep track of their fandoms, write reviews, and, eventually(though after this capstone is finished) 
                connect with eachother via live chats. You can set up a profile once you sign up by providing
                basic information like your name, email, profile picture, interests, hobbies, etc. Once you do that, 
                you will be able to create reviews by clicking a button on your home page in the 
                fandoms section. Reviews can have a title, body, tags, and number of stars, all
                easily configurable via a simple form when you create a review. 
            </p>
        </div>
        )
    }
}