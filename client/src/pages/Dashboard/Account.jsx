import { Row, Col } from "react-bootstrap";
import { PageLayout, Headings } from "../../component";
import { useStore } from "../../config/store";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiSettings, FiServer } from "react-icons/fi";

export default function Account() {
  const { currentUser } = useStore();
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${currentUser.user?.username} account`;
    if(location.pathname === '/account') {
        navigate(`account/${currentUser?.user?.username}/orders`)
    }
  }, [currentUser.user?.username, location.pathname, navigate]);
  const links = [
    {
      name: "orders",
      path: `${currentUser?.user?.username}/orders`,
      icon: <AiOutlineUnorderedList />,
    },
    {
      name: "Profile",
      path: `user-profile/${currentUser?.user?.username}`,
      icon: <AiOutlineUser />,
    },
    {
      name: "Saved Items",
      path: `${currentUser?.user?.username}/saveditems`,
      icon: <AiOutlineShoppingCart />,
    },
  ];

  const adminLinks = [
    {
      name: "Shop orders",
      path: `allorders`,
      icon: <BsFillBriefcaseFill />,
    },

    {
      name: "Manage product",
      path: `manage-product`,
      icon: <FiSettings />,
    },
    {
      name: "Add product",
      path: `add-new-product`,
      icon: <FiServer />,
    },
  ];
  return (
    <PageLayout>
      <Headings title={`Welcome, ${currentUser?.user?.username}`} />
      <Row
        className="mx-auto position-relative border border-3 shadow"
        style={{ minHeight: "700px" }}
      >
        <Col
          lg={3}
          className="bg-white p-3 d-none d-lg-block border position-absolute
        top-0 h-100"
        >
          {links.map((item, i) => (
            <span key={i} className="d-flex align-items-center gap-3 mb-3">
              <div style={{ fontSize: "30px" }}>{item.icon}</div>
              <NavLink
                to={`${item.path}`}
                className={({ isActive }) =>
                  isActive ? "text-success fw-bold" : "text-black fw-medium"
                }
              >
                {item.name}
              </NavLink>
            </span>
          ))}

          {currentUser?.user?.isAdmin === true && (
            <>
              <hr />
              {adminLinks.map((item, i) => (
                <span key={i} className="d-flex align-items-center gap-3 mb-3">
                  <div style={{ fontSize: "30px" }}>{item.icon}</div>
                  <NavLink
                    to={`${item.path}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-success fw-bold mt-1"
                        : "text-black fw-medium mt-1"
                    }
                  >
                    {item.name}
                  </NavLink>
                </span>
              ))}
            </>
          )}
        </Col>
        <Col lg={9} className="p-3 bg-light border ms-auto">
          <Outlet />
        </Col>
      </Row>
    </PageLayout>
  );
}
