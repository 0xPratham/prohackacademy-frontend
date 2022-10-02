import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import ReactCountryFlag from "react-country-flag";
import Link from 'next/link';

const Compact_number_formatter = new Intl.NumberFormat(undefined)

function ordinalsuffixof(i) {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

function getavatar(name) {
  const svg = createAvatar(style, {
    seed: name,
    dataUri: true,
  });
  return svg;
}

const ScoreBoardData = (props) => {
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "60px", maxWidth: "1130px" }}
      >
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <h2 className="pt-2 text-center">
                  <span className="header"> Scoreboard </span>
                  <span className="header">Top-100</span>
                </h2>
              </div>
            </div>
            <div className="card card-body rounded mb-2">
              <table className="table text-uppercase mb-0 table-borderless">
                <tbody>
                  {props?.data?.length > 0 ? (
                    props?.data?.map((content, key) => {
                      if (content?.points > 0) {
                        return (
                          <Link href={`/progress/${content?.username}`}>
                            <tr
                              className="table-row"
                              style={{ backgroundColor: "#181821" }}
                              key={key}
                            >
                              <td className="p-2 align-middle orange-left">
                                <span className="align white">
                                  {ordinalsuffixof(key + 1)}
                                </span>
                              </td>
                              <td className="p-2 align-middle text-center">
                                <img
                                  src={getavatar(content?.username)}
                                  className="align-middle img-rounded avatar mr-2 icon-border white"
                                  alt="User Avatar"
                                />
                              </td>
                              <td className="p-2 align-middle text-center">
                                <span className="align white">
                                  <Link href={`/progress/${content?.username}`}>
                                    <a>{content?.username}</a>
                                  </Link>
                                </span>
                              </td>
                              <td className="p-2 align-middle text-center">
                                <ReactCountryFlag
                                  className="white"
                                  countryCode="IN"
                                  svg
                                  style={{ width: "2rem", height: "2rem" }}
                                />
                              </td>
                              <td className="p-2 align-middle text-center">
                                <span className="align white">{`${
                                  new Date(content?.last_solve_date)
                                    .toLocaleString("en-US", {
                                      timeZone: "Asia/Kolkata",
                                    })
                                    .split(",")[1]
                                }`}</span>
                              </td>
                              <td className="p-2 align-middle text-center">
                                <span className="align white">
                                  {Compact_number_formatter.format(content?.points)} pts
                                </span>
                              </td>
                            </tr>
                          </Link>
                        );
                      }
                    })
                  ) : (
                    <tr
                      className="table-row"
                      style={{ backgroundColor: "#1f1f2b" }}
                    >
                      <h5
                        className="p-2 white align"
                        style={{ textAlign: "center" }}
                      >
                        no solves yet!
                      </h5>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoardData;
