import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './About.css'

const About = () => {
    return (
        <Card className="about-para">
            <h1>אודות האתר</h1>
            <h3>האתר הוקם כדי להקל על החיים של הסועדים , האתר והרעיון נוצר על ידי שלושה סטודנטים של המכללה למנהל</h3>
            <h3>באמצעות האתר תוכלו להיכנס למסעדה ובלי צורך להמתין זמן רב עד שהמלצר יתפנה תוכלו להזמין את המנות האהובות עליכם ישירות למטבח </h3>
            <h3>תוכלו לראות ביקורות של סועדים קודמים ולאחר ההזמנה תוכלו לדרג כאות נפשכם</h3>
            <h3>שמחים לארח אתכם תמיד </h3>
        </Card>
    );
};

export default About;