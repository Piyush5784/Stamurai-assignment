import { Link } from "react-router-dom";
import { DataProp } from "../Data";
import { useContext } from "react";
import { DataContext } from "../ContextApi";
import { useRecoilValue } from "recoil";
import { DetailsAtom } from "../Atoms/Atoms";

const TableTag = ({ loading, data }: { loading: boolean; data: DataProp }) => {
  const { citiesWeatherData } = useContext(DataContext);
  console.log(citiesWeatherData);

  const details = useRecoilValue(DetailsAtom);
  console.log(details);

  return (
    <>
      <table className="table-auto border border-gray-300">
        <thead className="w-full">
          <tr>
            <th className="px-4 py-2 bg-gray-200">Geoname ID</th>
            <th className="px-4 py-2 bg-gray-200">Name</th>
            <th className="px-4 py-2 bg-gray-200">Country name EN</th>
            <th className="px-4 py-2 bg-gray-200">ASCII Name</th>
            <th className="px-4 py-2 bg-gray-200">Population</th>
            <th className="px-4 py-2 bg-gray-200">Alternate Names</th>
            {/* <th className="px-4 py-2 bg-gray-200">Digital Elevation Model</th> */}
            <th className="px-4 py-2 bg-gray-200">Timezone</th>
            <th className="px-4 py-2 bg-gray-200">Country Code</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {!loading &&
            data.contents.map((item: any) => (
              <>
                <tr key={item.geoname_id}>
                  <td className="px-4 py-2 border">{item.geoname_id}</td>

                  <td className="px-4 py-2 border">
                    <Link to={`/weather/${item.name}`} target="_blank">
                      {item.name}{" "}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    {/* <Link to={`/weather/${item.cou_name_en}`} target="_blank"> */}
                    {item.cou_name_en}
                    {/* </Link> */}
                  </td>
                  <td className="px-4 py-2 border">{item.ascii_name}</td>
                  <td className="px-4 py-2 border">{item.population}</td>
                  <td className="px-4 py-2 border">
                    {item.alternate_names != null &&
                      item.alternate_names.slice(0, 1).join(", ")}
                  </td>
                  {/* <td className="px-4 py-2 border">{item.elevation}</td> */}
                  <td className="px-4 py-2 border">{item.timezone}</td>
                  <td className="px-4 py-2 border">{item.country_code}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TableTag;
