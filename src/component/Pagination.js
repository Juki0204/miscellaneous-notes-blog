import Link from 'next/link';

export const Pagination = ({ totalCount,id,directory }) => {
  const PER_PAGE = 5;

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  if(!id == ""){
    var idNum = Number(id);
  } else {
    var idNum = 1;
  }

  var maxNum = Math.ceil(Number(totalCount / PER_PAGE));
  console.log(maxNum);

  return (
    <ul>
      <li className={idNum == 1 ? "prev hidden" : "prev"}>
        <Link href={`${directory}${idNum - 1}`}>
          <a>&lt; Prev</a>
        </Link>
      </li>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={number === idNum ? "pagination active" : "pagination"}>
          <Link href={ `${directory}${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
      <li className={idNum == maxNum ? "next hidden" : "next"}>
        <Link href={`${directory}${idNum + 1}`}>
          <a>Next &gt;</a>
        </Link>
      </li>

      <style jsx>{`
        ul{
          grid-area: pagination;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .pagination a{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          margin: 5px;
        }
      
        .active a{
          border-radius: 100px;
          background: #333;
          color: #fff;
          pointer-events: none;
        }

        .prev,.next{
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 5px;
        }

        .hidden{
          visibility: hidden;
        }
      `}</style>
    </ul>
  );
};