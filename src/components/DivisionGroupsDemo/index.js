import dynamic from "next/dynamic";
import Spinner from "../Spinner";

const DivisionGroupsDemo = dynamic(() => import("./DivisionGroupsDemo"), {
  loading: () => <Spinner />,
});
export default DivisionGroupsDemo;
