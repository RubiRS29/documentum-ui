import {
    IonButton,
    IonButtons, IonCard, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon, IonInput, IonItem,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import {searchOutline} from "ionicons/icons";
import {useEffect, useState} from "react";
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import {searchData, searchDataForDate} from "../apiMethods/DataApi";

const StatisticsPage: React.FC = () => {

    const { name, date } = useParams<{ name: string; date: string }>();

    const [nums, setNums] =  useState<any>([])


    useEffect( () => {
        findByDate();
    }, [])

    const findByDate = () => {
        let nums = searchDataForDate(date);
        setNums(nums);
    }


    const dataForChart = {
        labels :   ["PROPOSED", "RETIRED", "PUBLISHED", "DRAFT"],
        datasets: [{
            label: 'My First Dataset',
            data: [nums[0]?.proposed, nums[0]?.retired, nums[0]?.published, nums[0]?.draft],

            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
        }]

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonCard>
                    <IonTitle class="title-table"> Documentum Report for date {date} </IonTitle>
                </IonCard>

                <IonItem>
                    <IonInput required={true} placeholder="DD-MM-YYYY"></IonInput>

                    <IonButton color="primary" fill="solid" slot="end" size="default">
                        <IonIcon icon={searchOutline} />
                        Search for date
                    </IonButton>
                </IonItem>



                <IonGrid>
                    <IonRow>

                        <IonCol size="6">
                            <IonGrid className="table">

                                <IonCard>
                                    <IonRow className="table-row-title">
                                        <IonCol>Status</IonCol>
                                        <IonCol>Quantity</IonCol>
                                    </IonRow>

                                    {
                                        nums.map( (dt:any) =>
                                            <div>
                                                <IonRow className="table-row-content">
                                                    <IonCol>PROPOSED</IonCol>
                                                    <IonCol>{dt.proposed}</IonCol>
                                                </IonRow>
                                                <IonRow className="table-row-content">
                                                    <IonCol>RETIRED</IonCol>
                                                    <IonCol>{dt.retired}</IonCol>
                                                </IonRow>
                                                <IonRow className="table-row-content">
                                                    <IonCol>PUBLISHED</IonCol>
                                                    <IonCol>{dt.published}</IonCol>
                                                </IonRow>
                                                <IonRow className="table-row-content">
                                                    <IonCol>DRAFT</IonCol>
                                                    <IonCol>{dt.draft}</IonCol>
                                                </IonRow>
                                            </div>
                                        )
                                    }

                                </IonCard>
                            </IonGrid>
                        </IonCol>

                        <IonCol>
                            <IonCard>
                                <div>
                                    <h1>
                                        Statistics
                                    </h1>
                                    <Doughnut data={dataForChart} />
                                </div>
                            </IonCard>

                        </IonCol>

                    </IonRow>
                </IonGrid>


            </IonContent>
        </IonPage>
    );
};

export default StatisticsPage;