import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      WorldWise
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;
