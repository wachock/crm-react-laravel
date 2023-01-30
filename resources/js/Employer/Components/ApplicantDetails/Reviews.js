import React, { useState } from 'react'
import user from '../../../Assets/image/user.png'

export default function Reviews() {
  const [review, seReview] = useState([
    {id: 1, author: "Allie Grater", rating: "4.0", reviewText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"},
    {id: 2, author: "John Doe", rating: "5.0", reviewText: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"},
    {id: 3, author: "Krgis Ali", rating: "2.0", reviewText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"},
  ])
  const [name, setName] = useState('');
  const [yourReview, setYourReview] = useState('');
  return (
    <div>
      <div className='Reviews'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 col-xs-6'>
              <h5>Reviews</h5>
            </div>
            <div className='col-sm-6 col-xs-6'>
              <div className='float-right'>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#reviewModal">
                  Write a review
                </button>
                <div className="modal fade" id="reviewModal" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="reviewModalLabel">Write a review</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label className="control-label">Your Name *</label>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Your Name"
                            />
                          </div>
                          <div className="form-group">
                            <label className="control-label">Rating *</label>
                            <div id="input-rating">
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  name="rating"
                                  id="input-rating-1"
                                  className="form-check-input"
                                  value="1"
                                /><label for="input-rating-1" className="form-check-label">1</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  name="rating"
                                  id="input-rating-2"
                                  className="form-check-input"
                                  value="2"
                                /><label for="input-rating-2" className="form-check-label">2</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  name="rating"
                                  id="input-rating-3"
                                  className="form-check-input"
                                  value="3"
                                /><label for="input-rating-3" className="form-check-label">3</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  name="rating"
                                  id="input-rating-4"
                                  className="form-check-input"
                                  value="4"
                                /><label for="input-rating-4" className="form-check-label">4</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  type="radio"
                                  name="rating"
                                  id="input-rating-5"
                                  className="form-check-input"
                                  value="5"
                                /><label for="input-rating-5" className="form-check-label">5</label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              value={yourReview}
                              onChange={(e) => setYourReview(e.target.value)}
                              className="form-control"
                              rows="3"
                              placeholder="Write your review"
                            ></textarea>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {review && review.map((item, index) => (
            <div className='review-loop'>
              <div className='review-slab' key={index}>
                <div className='rImg'>
                  <img src={user} className='img-fluid' alt='User image' />
                </div>
                <div className='rContent'>
                  <h6>{item.author}</h6>
                  <div className='rating'>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <p>{item.rating}</p>
                  </div>
                </div>
              </div>
              <div className='rText'>
                <p>{item.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
