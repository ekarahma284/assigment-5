import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyRates = () => {
    const [rates, setRates] = useState([]);
    const API_KEY = "33004c3fef3344a7b75b946b7493ca1b";

    const fetchRates = async () => {
        try {
            const response = await axios.get(URL.parse(
                `https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=CAD,IDR,JPY,CHF,EUR,GBP`
            )
            );
            const usdRates = response.data.rates;

            const processedRates = [
                "CAD",
                "EUR",
                "IDR",
                "JPY",
                "CHF",
                "GBP",
            ].map((currency) => {
                const exchangeRate = parseFloat(usdRates[currency]);
                return {
                    currency,
                    exchangeRate,
                    weBuy: (exchangeRate * 1).toFixed(4),
                    weSell: (exchangeRate * 1).toFixed(4),
                };
            });

            setRates(processedRates);
        } catch (error) {
            console.error("Error fetching the currency rates", error);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);


    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#D2691E" }}>
            <h1 className="text-center text-white mb-4">Currency Exchange Rates (Base: USD)</h1>
            <table className="table table-bordered table-hover text-center text-white" style={{ width: "60%" }}>
                <thead className="thead-light">
                    <tr>
                        <th>Currency</th>
                        <th>We Buy</th>
                        <th>Exchange Rate</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate) => (
                        <tr key={rate.currency}>
                            <td>{rate.currency}</td>
                            <td>{rate.weBuy}</td>
                            <td>{rate.exchangeRate}</td>
                            <td>{rate.weSell}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-white mt-3">
                Rates are based from 1 USD.<br />
                This application uses API from
                <a href="https://currencyfreaks.com" className="text-white">https://currencyfreaks.com</a>.
            </p>
        </div>
    );

    // return (
    //   <div>
    //     <h1>Currency Exchange Rates (Base: USD)</h1>
    //     <table border="1">
    //       <thead>
    //         <tr>
    //           <th>Currency</th>
    //           <th>We Buy</th>
    //           <th>Exchange Rate</th>
    //           <th>We Sell</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {rates.map((rate) => (
    //           <tr key={rate.currency}>
    //             <td>{rate.currency}</td>
    //             <td>{rate.weBuy}</td>
    //             <td>{rate.exchangeRate}</td>
    //             <td>{rate.weSell}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // );
};

export default CurrencyRates;
