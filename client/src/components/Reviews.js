import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Reviews = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews from server when the component mounts
        axios.get('/api/reviews')
            .then(response => setReviews(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('/api/reviews', { name, rating, reviewText })
        .then(response => {
            setReviews([...reviews, response.data]);
            setName('');
            setRating(0);
            setReviewText('');
            alert('Review submitted successfully!');
            // if (response.ok) {
            //     // Clear form fields and display success message
            //     setName('');
            //     setRating(0);
            //     setReviewText('');
            //     alert('Review submitted successfully!');
            // } else {
            //     // Handle error
            //     const errorData = await response.json();
            //     alert(`Error: ${errorData.error}`);
            // }
        }) 
        .catch(error => console.error(error));
            alert('An error occurred while submitting the review.');
    };

    return (
        <div>
            <h2>Customer Reviews</h2>
            <div>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review) => (
                            <li key={review._id}>
                                <h3>{review.name}</h3>
                                <p>{review.reviewText}</p>
                                <p>Rating: {review.rating}/5</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
            <div className='p-5'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="rating">Rating:</label>
                <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="reviewText">Review Text:</label>
                <textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required></textarea>
                <button type="submit">Submit Review</button>
            </form>
            </div>
        </div>
    );
};

export default Reviews;