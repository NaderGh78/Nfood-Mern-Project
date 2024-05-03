import "./contact.css";
import { HeadingBreadcrumb } from "../../allPagesPaths";
import { useTitle } from "../../components/helpers";
import { FaRegEnvelope, FaMapMarkerAlt, FaMobileAlt } from "react-icons/fa";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Contact = () => {

    // get the page title
    useTitle(`Contact - Nfood`);

    /*===========================================*/

    return (
        <div className="contact">
            <HeadingBreadcrumb breadcrumb="Contact" />
            <div className="contact-box">
                <div className="myContainer">
                    <div className="top">
                        <h4>Call us or visit place</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    {/* end top */}

                    <div className="middle">
                        <div>
                            <span className="icon"><FaMobileAlt /></span>
                            <h5>Phone : </h5>
                            <p>
                                <a href="tel:70123456">70123456</a>
                                <a href="tel:70666666">70666666</a>
                            </p>
                        </div>
                        <div>
                            <span className="icon"><FaMapMarkerAlt /></span>
                            <h5>Address : </h5>
                            <p>
                                <span className="d-block">Lebanon-Beirut.</span>
                                <span className="d-block">Hamra Main Street.</span>
                            </p>
                        </div>
                        <div>
                            <span className="icon"><FaRegEnvelope /></span>
                            <h5>Email : </h5>
                            <p>
                                <a href="mailto:contact@example.com">contact@example.com</a>
                                <a href="mailto:fake@example.com">fake@example.com</a>
                            </p>
                        </div>
                    </div>
                    {/* end middle */}

                    <div className="bottom">
                        <div className="left">
                            <div className="my-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52992.23057523123!2d35.46308256535696!3d33.88928269491585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut!5e0!3m2!1sen!2slb!4v1710720981339!5m2!1sen!2slb" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>

                        <div className="right">
                            <div className="my-form">
                                <h2 className="form-title mb-1">Send us a message</h2>
                                <p style={{ marginBottom: "25px", color: "var(--light-white)", lineHeight: "1" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <form>
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" id="name" placeholder="Your name" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="email" className="form-control" id="email" placeholder="Email" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" id="name" placeholder="Subject" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <textarea name="" id="" cols="30" rows="10" placeholder="Comment"></textarea>
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* end middle */}
                </div>
            </div>
        </div>
    )
}

export default Contact;