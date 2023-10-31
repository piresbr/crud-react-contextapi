import React from 'react';

function ConvertDateHour(dataHora: Date): string {
    const dia = dataHora.getDate().toString().padStart(2, '0');
    const mes = (dataHora.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataHora.getFullYear();
    const hora = dataHora.getHours().toString().padStart(2, '0');
    const minutos = dataHora.getMinutes().toString().padStart(2, '0');
    const segundos = dataHora.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
}

interface DateAndHourProps {
    dataHora: Date;
}

const DateAndHour: React.FC<DateAndHourProps> = ({ dataHora }) => {
    const formattedDateAndHour = ConvertDateHour(dataHora);

    return <span>{formattedDateAndHour}</span>;
}

export default DateAndHour;
