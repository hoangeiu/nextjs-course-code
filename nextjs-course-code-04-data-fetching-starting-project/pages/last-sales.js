import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  //#region
  const { data, error } = useSWR(
    "https://nextjs-course-udemy-code-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volumn: data[key].volumn,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);
  //#endregion

  //#region
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-udemy-code-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volumn: data[key].volumn,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  //   if (!sales) {
  //     return <p>No data yet</p>;
  //   }
  //#endregion

  //   if (error) {
  //     return <p>Failed to load.</p>;
  //   }

  //   if (!data || !sales) {
  //     return <p>Loading...</p>;
  //   }

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volumn}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-udemy-code-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volumn: data[key].volumn,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
  };
}

export default LastSalesPage;
