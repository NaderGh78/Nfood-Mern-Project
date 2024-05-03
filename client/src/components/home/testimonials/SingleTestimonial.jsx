const SingleTestimonial = ({ data: { id, desc, name, imgSrc } }) => {
    return (
        <div className="single-testimonial">
            <p>"{desc}"</p>
            <h5 className="text-capitalize">{name}</h5>
            <div className="img-box">
                <img src={process.env.PUBLIC_URL + imgSrc} alt={`testimonial ${id}`} />
            </div>
        </div>
    )
}

export default SingleTestimonial;