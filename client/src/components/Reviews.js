import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";

const Reviews = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews from server when the component mounts
        axios.get('http://localhost:5000/api/reviews')
            .then(response => setReviews(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/reviews', { name, rating, reviewText });
            setReviews([...reviews, response.data]);
            console.log(reviews);
            console.log(response.status);
            setName('');
            setRating(0);
            setReviewText('');
            alert('Review submitted successfully!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while submitting the review.');
        }
    };

    return (
        <div className="container mt-4">
            <div className='row' style={{ height: '33vh' }}>
                <div className='col-md-9' style={{ height: '100%' }}>
                    <h3>Customer Reviews</h3>
                    {reviews.length > 0 ? (
                        <Carousel className='m-3' fade data-bs-theme="dark" style={{height: '75%'}}>
                            {reviews.map((review) => (
                                <Carousel.Item key={review._id}>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <h4>{review.name}</h4>
                                        <p>{review.reviewText}</p>
                                        <p>Rating: {Array.from({ length: review.rating }, (_, index) => <span key={index}>⭐</span>)}</p>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
                <div className='col-md-3 mt-4 mt-md-0'>
                    <form onSubmit={handleSubmit}>
                        <h3>Add review</h3>
                        <div className='form-group'>
                            <label htmlFor="name" className='form-label'>Name:</label>
                            <input type="text" id="name" className='form-control-sm ml-1' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='form-group m-1'>
                            <label htmlFor="rating" className='form-label'>Rating:</label>
                            <select id="rating" className='form-select-sm m-1' value={rating} onChange={(e) => setRating(e.target.value)} required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="reviewText" className='form-label'>Review Text:</label>
                            <textarea id="reviewText" className='form-control-sm ml-1' value={reviewText} onChange={(e) => setReviewText(e.target.value)} required></textarea>
                        </div>
                        <button type="submit" className='btn btn-primary'>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reviews;