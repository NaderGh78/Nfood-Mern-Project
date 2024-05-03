import { Link } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminRecentOrders = () => {

  const profiles = [
    { id: 1, username: "salim salim", userImage: "/assets/images/review.png", email: "hello@gmail.com" },
    { id: 2, username: "dani dani", userImage: "/assets/images/review.png", email: "dani@gmail.com" },
    { id: 3, username: "mike mike", userImage: "/assets/images/review.png", email: "mike@gmail.com" },
    { id: 4, username: "maged maged", userImage: "/assets/images/review.png", email: "maged@gmail.com" },
    { id: 5, username: "wael wael", userImage: "/assets/images/review.png", email: "wael@gmail.com" },
    { id: 6, username: "sami sami", userImage: "/assets/images/review.png", email: "sami@gmail.com" },
    { id: 7, username: "fawzet fawzet", userImage: "/assets/images/review.png", email: "fawzet@gmail.com" },
    { id: 8, username: "adnan adnan", userImage: "/assets/images/review.png", email: "adnan@gmail.com" }
  ];

  /*===========================================*/

  // check if the posts length is less than 5 show them, otherwise sliced the first 5 posts
  const slicedUsers = profiles?.length < 5 ? profiles : profiles?.slice(0, 5);

  return (
    <div className='table-box recent-orders'>
      <h2>Recent Orders</h2>
      <table className="table table-hover table-bordered table-transparent mb-0">
        <thead>
          <tr>
            <th scope="col" className='text-center'>#</th>
            <th scope="col" className='text-center'>User</th>
            <th scope="col" className='text-center'>Email</th>
          </tr>
        </thead>
        <tbody>
          {slicedUsers?.map((el, idx) => (
            <tr key={idx}>
              <th scope="row" className='text-center'>{idx + 1}</th>
              <td className='text-center text-capitalize'>
                <Link to="/" className="text-decoration-none text-dark">
                  {el.userImage &&
                    <img
                      src={process.env.PUBLIC_URL + el.userImage}
                      alt="user image"
                      className="d-block mx-auto"
                      style={{ width: "33px", height: "33px" }}
                    />
                  }
                </Link>
                {el.username}
              </td>
              <td className='text-center'>
                <a href={`mailto:${el.email}`} target="_blank">{el.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminRecentOrders;