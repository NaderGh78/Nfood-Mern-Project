import "./tabsItemDetails.css";
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Reviews from "../reviews/Reviews";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const TabsItemDetailes = () => {

    const [key, setKey] = useState('Description');

    /*===========================================*/

    return (
        <div className="my-tab" id="reviews">
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="Description" title="Description">
                    <p>
                        Although the legendary Double Burger really needs no introduction,
                        please allow us… Tucked in between three soft buns are two all-beef patties,
                        cheddar cheese, ketchup, onion, pickles and iceberg lettuce.
                        Hesburger’s own paprika and cucumber mayonnaise add the crowning touch. Oh baby!
                    </p>
                    <p>
                        <span>Ingredients : </span>
                        Dr. Praeger’s Black Bean Burger, Focaccia bun, Balsamic Vinaigrette, Pesto, Tomato, Swiss Cheese
                    </p>
                </Tab>
                <Tab eventKey="profile" title="Reviews (5)">
                    <Reviews />
                </Tab>
            </Tabs>
        </div>
    )
}

export default TabsItemDetailes; 