import { useEffect } from "react";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { dataAtom, limitAtom, inputAtom, loadingAtom } from "../Atoms/Atoms";
import { Loading } from "../Components/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../Functions";
import TableTag from "../Components/TableTag";
import Input_Functions from "../Components/Input_Functions";

export default function Tables() {
  const [data, setData] = useRecoilStateLoadable<any>(dataAtom);

  const navigate = useNavigate();

  const [limit, setLimt] = useRecoilState(limitAtom);

  const [input, setInput] = useRecoilState(inputAtom);

  const [loading, setLoading] = useRecoilState(loadingAtom);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLimt((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData({ setLoading, input, limit, setData, navigate });
  }, [input, limit]);

  if (data.state == "loading") {
    <div className="ml-[50%]">
      <Loading />
    </div>;
  } else if (data.state == "hasValue") {
    return (
      <>
        <div>
          <p className="text-center p-5 font-bold  text-3xl">City Table</p>

          <Input_Functions
            input={input}
            setInput={setInput}
            data={data}
            setData={setData}
          />

          <TableTag loading={loading} data={data} />
        </div>
      </>
    );
  }
}
