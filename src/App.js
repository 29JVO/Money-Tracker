import {useEffect, useState} from "react";

function App() {
    const [name, setName] = useState(" ");
    const [date, setDate] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [transactions, setTransactions] = useState([]);

    function addNewTransaction(event) {
        event.preventDefault();
        const url = process.env.REACT_APP_API_URL + "/transaction";
        const price = name.split(' ')[0]
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                price,
                name: name.substring(price.length + 1),
                date,
                description}),
        }).then(response => response.json().then(json => {
            setName('')
            setDate('')
            setDescription('')
            console.log('result', json)
        }));
    }

    let balance = 0
    for (const transaction of transactions) {
        balance = balance + transaction.price
    }
    balance = balance.toFixed(2);
    const fraction = balance.split('.')[1]
    balance = balance.split('.')[0]

    return (
        <main>
            <h1>${balance}<span>{fraction}</span></h1>
            <form onClick={addNewTransaction}>
                <div className={"basics"}>
                    <input
                        type={"text"}
                        placeholder={"+200  Samsung TV "}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        onChange={e => setDate(e.target.value)}
                        type={"datetime-local"}
                    />
                </div>
                <div className={"description"}>
                    <input
                        type={"text"}
                        placeholder={"Description"}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button type={"submit"}>Add new transaction</button>

            </form>
            <div className={"transactions"}>
                {transactions.length > 0 && transactions.map(transaction => (
                    <div className={"transaction"}>
                        <div className={"left"}>
                            <div className={"name"}>{transactions.name}</div>
                            <div className="description">{transactions.description}</div>
                        </div>
                        <div className={"right"}>
                            <div className={"price" + (transaction.price < 0 ? 'red':'green')}>{transaction.price}</div>
                            <div className="datetime">{transactions.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
