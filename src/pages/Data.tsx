import {
    IonButton,
    IonButtons, IonCard, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon, IonInput, IonItem, IonLabel,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {useHistory, useParams} from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import {add, barChart, search, searchOutline, text} from "ionicons/icons";
import {useEffect, useState} from "react";
import {searchData, searchDataForDate} from "../apiMethods/DataApi";

const Data: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [data, setData] =  useState<any>([])
    const [dateSearch, setDateSearch] =  useState<any>([])
    const history =useHistory();

    useEffect( () => {
        search();
    }, [])


    const search = () => {
        let data = searchData();
        setData(data);
    }

    const findByDate = () => {
        history.push('/page/statistics/'+dateSearch)
    }
    const viewStatistics = (dataDate:string) => {
        history.push('/page/statistics/'+dataDate)
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
                    <IonTitle class="title-table"> Documentum Report</IonTitle>
                </IonCard>

                <IonGrid className="table">
                    <IonItem>
                        <IonInput required placeholder="DD-MM-YYYY" onIonChange={e => setDateSearch(e.detail.value)} value={dateSearch}></IonInput>

                        <IonButton onClick={findByDate} color="primary" fill="solid" slot="end" size="default">
                            <IonIcon icon={searchOutline} />
                                Search for date
                        </IonButton>
                    </IonItem>



                    <IonCard>

                        <IonRow className="table-row-title">
                            <IonCol>DATE</IonCol>
                            <IonCol>PROPOSED</IonCol>
                            <IonCol>RETIRED</IonCol>
                            <IonCol>PUBLISHED</IonCol>
                            <IonCol>DRAFT</IonCol>
                            <IonCol>Statistics</IonCol>
                        </IonRow>


                        {
                            data.map( (dt:any) =>
                                <IonRow className="table-row-content">
                                    <IonCol>{dt.date}</IonCol>
                                    <IonCol>{dt.proposed}</IonCol>
                                    <IonCol>{dt.retired}</IonCol>
                                    <IonCol>{dt.published}</IonCol>
                                    <IonCol>{dt.draft}</IonCol>
                                    <IonCol>
                                        <IonButton color="primary" fill="clear" onClick={() => viewStatistics(String(dt.date))}>
                                            <IonIcon icon={barChart} />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>

                            )
                        }



                    </IonCard>

                </IonGrid>




            </IonContent>
        </IonPage>
);
};

export default Data;
