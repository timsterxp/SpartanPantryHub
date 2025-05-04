import React from 'react';

// This page is meant to provide steps for how the Pantry Works(Including Signing UP) as well as other resources SJSU-Cares Provides.
const MoreResourcesView = () => {
    return (
        <div style={{padding: '100px 100px 100px 100px'}}>
            <h1> How Spartan Food Pantry Works: </h1>
            <h2> Step 1: Check In </h2>
            <p> Complete the <a href="https://sjsu.qualtrics.com/jfe/form/SV_3jDkvbK7IA0xeWG"
                                style={{color: 'blue', textDecoration: 'underline'}}> Spartan Food Pantry Intake &
                Agreement Form</a>.
                Once approved, create an account in PantrySoft via link found in your confirmation email. This must be
                completed before the first visit of each academic year.
                Bring your Tower ID to the Pantry to check in.
            </p>
            <h2> Step 2: Shop</h2>
            <p>
                Grab a basket and shop for items within our zones.
                Fresh Produce Zone (For health reasons, only touch what you will take.)
                Dry Goods Zone
                Cool Zone
                Toiletries & More Zone
                Quantity limits on items are based on availability and demand to ensure all students get an opportunity
                to select.
            </p>
            <h2> Step 3: Checkout </h2>
            <p>
                Bring basket to counter to check out with staff
                Bag items (in the re-usable bag you've brought).
            </p>

            <h1> Other Resources That SJSUCares Provide:</h1>
            <h2>Housing Assistance (Click to Request Help) </h2>
            <ul>
                <li>
                    <a href="https://cm.maxient.com/reportingform.php?SanJoseStateUniv&layout_id=12"
                       style={{color: 'blue', textDecoration: 'underline'}}>
                        Emergency Bed Program
                    </a>
                </li>
                <li>
                    <a href="https://cm.maxient.com/reportingform.php?SanJoseStateUniv&layout_id=12"
                       style={{color: 'blue', textDecoration: 'underline'}}>
                        Rapid ReHousing Program
                    </a>
                </li>
                <li>
                    <a href="https://gissellemunoz.youcanbook.me/" style={{color: 'blue', textDecoration: 'underline'}}>
                        Housing Search Assistance
                    </a>
                </li>
            </ul>
            <h2> More Food Assistance (Email for assistance) </h2>
            <ul>
                <li>
                    CalFresh Food Help
                </li>
            </ul>
            <h2>Case Management Assistance (Click to Request Help)</h2>
            <ul>
                <li>
                    <a href="https://cm.maxient.com/reportingform.php?SanJoseStateUniv&layout_id=12"
                       style={{color: 'blue', textDecoration: 'underline'}}>
                        Emergency Assistance
                    </a>
                </li>
                <li>
                    <a href="https://cm.maxient.com/reportingform.php?SanJoseStateUniv&layout_id=12"
                       style={{color: 'blue', textDecoration: 'underline'}}>
                        Crisis Grant
                    </a>
                </li>
                <li>
                    General Case Management Support
                </li>
            </ul>

            <h1>General Contact Information</h1>
            <p>
                SJSU Cares at San José State University (Clark Hall, Room 140)
            </p>
            <p>
                sjsucares@sjsu.edu

                408.924.1234
            </p>

        </div>
    )
};

export default MoreResourcesView;