import React from 'react'
import './Landing.css'

export default class Landing extends React.Component{
    render() {
        return(
            <div className="landing">
            <h1>How to use the website</h1>
            <p>Welcome to Fanio! In order to create an account, go to the account
                page. This idea of this website is for folk who are fans of books, tv shows, movies, etc. to 
                keep track of their fandoms, write reviews, and, eventually
                connect with eachother via live chats. You can set up a profile once you sign up by providing
                basic information like your name, email, interests, hobbies, etc. Once you do that, 
                you will be able to create fandoms, installments, sections/sub-sections and reviews all with a click of a button. Reviews can have a title, body, tags, and number of stars, all
                easily configurable via a simple form when you create a review. 
            </p>
        </div>
        )
    }
}