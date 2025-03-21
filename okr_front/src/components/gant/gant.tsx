import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./gant.css"
import {filterInterface} from "../filterForm/FilterForm.tsx";
import endpoint from "../../api/endpoints.ts";
import BaseProps from "../Base/BasePropsInterface.ts";

type Request = {
    startDate: string;
    endDate: string;
    type: string;
};

type Student = {
    surname: string;
    name: string;
    patronymic: string;
    requests: Request[];
};

type Group = {
    groupName: string | null;
    students: Student[];
};

type Data = {
    groups: Group[];
};

// Цвета для типов отсутствий
const absenceColors: Record<string, string> = {
    FAMILY: "#FCA130",
    SICK: "#55D468",
    EVENT_TRIP: "#5BDEDE"
};

// Функция для получения всех дат в диапазоне
const getDatesInRange = (startDate: string, endDate: string): string[] => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

// Функция для получения минимальной и максимальной даты
const getDateRange = (data: Data): { start: Date; end: Date } => {
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    data.groups.forEach((group) => {
        group.students.forEach((student) => {
            student.requests.forEach((request) => {
                const startDate = new Date(request.startDate);
                const endDate = new Date(request.endDate);

                if (!minDate || startDate < minDate) {
                    minDate = startDate;
                }
                if (!maxDate || endDate > maxDate) {
                    maxDate = endDate;
                }
            });
        });
    });

    if (!minDate || !maxDate) {
        const today = new Date();
        return {start: today, end: today};
    }

    return {start: minDate, end: maxDate};
};

interface GanttProps extends BaseProps{
    filtration: filterInterface
    jwt: string
}


function GanttTable(props : GanttProps) {
    const filters = props.filtration;
    const jwt = props.jwt

    const [data, setData] = useState<Data>({"groups": []});

    useEffect(() => {
        endpoint.gant.gant(jwt, filters).then(
            data => setData({"groups": data.groups})
        );
        console.log(data);
    }, []);

    useEffect(() => {
        endpoint.gant.gant(jwt, filters).then(
            data => setData({"groups": data.groups})
        );
        console.log(data);
    }, [JSON.stringify(filters)]);

    const { start, end } = getDateRange(data);
    const allDates = getDatesInRange(start.toISOString().split("T")[0], end.toISOString().split("T")[0]);

    return (
        <div className="container-fluid mt-2 mb-2">
            {/*<h1>Таблица отсутствий студентов</h1>*/}
            <div className="d-flex card-view ">
                {/* Фиксированная колонка с группами и студентами */}
                <div className="flex-shrink-0 table-responsive  table-view" style={{width: "400px"}}>
                    <table className="table table-bordered list-view mt-2 ms-2">

                        <thead>
                        <tr>
                            <td className="sticky-top bg-white "
                                style={{zIndex: 2, height: "35px", fontSize: "0.75em", borderTopLeftRadius: "10px"}}>
                            </td>
                        </tr>
                        </thead>

                        <tbody>
                        {data.groups.map((group, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                <tr>
                                    <td className="sticky-left bg-white" style={{zIndex: 1, height: "40px"}}>
                                        {`Группа: ${group.groupName || "Без группы"}`}
                                    </td>
                                </tr>

                                {group.students.map((student, studentIndex) => (
                                    <tr key={studentIndex}>
                                        <td className="sticky-left bg-white " style={{
                                            zIndex: 1,
                                            height: "40px",
                                            // maxWidth: "0.75vw",
                                            // minWidth: "0.50vw",
                                            // width: "20px",
                                            whiteSpace: "nowrap",
                                            // overflow: "hidden",
                                            // textOverflow: "ellipsis"
                                        }}>
                                            {`\u00A0 \u00A0 ${student.surname} ${student.name} ${student.patronymic}`}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Прокручиваемая часть с датами */}
                <div className="flex-grow-1 overflow-auto table-view mt-2 me-2">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            {allDates.map((date) => {
                                const formattedDate = new Date(date);
                                const dayMonth = formattedDate.toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'numeric'
                                });
                                // const year = formattedDate.toLocaleDateString('ru-RU', {year: 'numeric'});

                                return (
                                    <td key={date} className="sticky-top bg-white "
                                        style={{zIndex: 2, height: "35px", fontSize: "0.75em"}}>
                                        {`${dayMonth}`}
                                        {/*<br/>{year}*/}
                                    </td>
                                );
                            })}
                        </tr>
                        </thead>

                        <tbody>
                        {data.groups.map((group, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                <tr key={groupIndex} >
                                    {allDates.map((date) => (
                                        <td key={date} className="bg-transparent" style={{height: "41px", maxWidth: "50px !important"}}/>
                                    ))}
                                </tr>

                                {group.students.map((student, studentIndex) => (
                                    <tr key={studentIndex}>
                                        {allDates.map((date) => {
                                            const absence = student.requests.find((request) => {
                                                const dates = getDatesInRange(request.startDate, request.endDate);
                                                return dates.includes(date);
                                            });

                                            return (
                                                <td
                                                    key={date}
                                                    style={{
                                                        backgroundColor: absence ? absenceColors[absence.type] : "transparent",
                                                        height: "41px",
                                                        maxWidth: "50px !important"
                                                    }}
                                                    title={absence ? absence.type : ""}
                                                />
                                            );
                                        })}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GanttTable;