import React from 'react';

function formatBrazilianDateTime(dateTime: Date): string {
    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
}

interface BrazilianDateTimeProps {
    dateTime: string;
}

const BrazilianDateTime: React.FC<BrazilianDateTimeProps> = ({ dateTime }) => {
    const dateTimeObj = new Date(dateTime);
    const formattedDateTime = formatBrazilianDateTime(dateTimeObj);

    return <span>{formattedDateTime}</span>;
}

export default BrazilianDateTime;
