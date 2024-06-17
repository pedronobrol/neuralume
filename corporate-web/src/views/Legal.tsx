/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import StandardView from "../components/StandardView";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import TagLine from "../components/TagLine";
import Paragraph from "../components/Paragraph";
import { Link } from "react-router-dom";
import Anchor from "../components/Anchor";
import SubSectionHeading from "../components/SubSectionHeading";

const LegalView: React.FC = () => {
    return (
        <StandardView pageTitle="Políticas y términos">
            <Container>
                <SectionHeading>Política de Privacidad</SectionHeading>
                Última actualización: Enero 2021.
                <SubSectionHeading>Información al usuario</SubSectionHeading>
                <Paragraph>
                    Neuralume Labs Ltd (de aquí en adelante, "Neuralume",
                    "nosotros", o "nuestro") como Responsable del Tratamiento,
                    le informa que, según lo dispuesto en el Reglamento (UE)
                    2016/679, de 27 de abril, (RGPD) y en la L.O. 3/2018, de 5
                    de diciembre, de protección de datos y garantía de los
                    derechos digitales (LOPDGDD), trataremos su datos tal y como
                    reflejamos en la presente Política de Privacidad.
                </Paragraph>
                <Paragraph>
                    En esta Política de Privacidad describimos cómo recogemos
                    sus datos personales y por qué los recogemos, qué hacemos
                    con ellos, con quién los compartimos, cómo los protegemos y
                    sus opciones en cuanto al tratamiento de sus datos
                    personales.
                </Paragraph>
                <Paragraph>
                    Esta Política se aplica al tratamiento de sus datos
                    personales recogidos por la empresa para la prestación de
                    sus servicios. Si acepta las medidas de esta Política,
                    acepta que tratemos sus datos personales como se define en
                    esta Política.
                </Paragraph>
                <SubSectionHeading>Contacto</SubSectionHeading>
                <Paragraph>
                    Neuralume Labs Ltd es una empresa registrada en Inglaterra y
                    Gales en Companies House (el registro mercantil del Gobierno
                    de Su Majestad del Reino Unido), con número de registro
                    13031292, y domicilio social 54B Tottenham Court Road, W1T
                    2EL London, UK. Puede ponerse en contacto con nosotros para
                    solicitar información o ejercer sus derechos de acceso,
                    rectificación, supresión y oposición, limitación del
                    tratamiento y de portabilidad a esa dirección o a través del
                    correo electrónico contact@neuralume.com.
                </Paragraph>
                <SubSectionHeading>Principios clave</SubSectionHeading>
                <Paragraph>
                    Siempre hemos estado comprometidos con prestar nuestros
                    servicios con el más alto grado de calidad, lo que incluye
                    tratar sus datos con seguridad y transparencia. Nuestros
                    principios son:
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            Legalidad: Solo recopilaremos sus Datos personales
                            para fines específicos, explícitos y legítimos.{" "}
                        </li>
                        <li>
                            Minimización de datos: Limitamos la recogida de
                            datos de carácter personal a lo que es estrictamente
                            relevante y necesario para los fines para los que se
                            han recopilado.{" "}
                        </li>
                        <li>
                            Limitación de la Finalidad: Solo recogeremos sus
                            datos personales para los fines declarados y solo
                            según sus deseos.
                        </li>
                        <li>
                            Precisión: Mantendremos sus datos personales exactos
                            y actualizados.
                        </li>
                        <li>
                            Seguridad de los Datos: Aplicamos las medidas
                            técnicas y organizativas adecuadas y proporcionales
                            a los riesgos para garantizar que sus datos no
                            sufran daños, tales como divulgación o acceso no
                            autorizado, la destrucción accidental o ilícita o su
                            pérdida accidental o alteración y cualquier otra
                            forma de tratamiento ilícito.
                        </li>
                        <li>
                            Acceso y Rectificación: Disponemos de medios para
                            que acceda o rectifique sus datos cuando lo
                            considere oportuno.
                        </li>
                        <li>
                            Conservación: Conservamos sus datos personales de
                            manera legal y apropiada y solo mientras es
                            necesario para los fines para los que se han
                            recopilado.
                        </li>
                        <li>
                            Las transferencias internacionales: cuando se dé el
                            caso de que sus datos vayan a ser transferidos fuera
                            de la UE/EEE se protegerán adecuadamente.
                        </li>
                        <li>
                            Terceros: El acceso y transferencia de datos
                            personales a terceros se llevan a cabo de acuerdo
                            con las leyes y reglamentos aplicables y con las
                            garantías contractuales adecuadas.
                        </li>
                        <li>
                            Marketing Directo y cookies: Cumplimos con la
                            legislación aplicable en materia de publicidad y
                            cookies.
                        </li>
                    </ul>
                </Paragraph>
                <SubSectionHeading>
                    Recogida y tratamiento de sus datos personales
                </SubSectionHeading>
                <Paragraph>
                    <ul>
                        <li>
                            Sitio corporativo: al navegar en nuestro sitio web
                            corporativo (www.neuralume.com) recogemos datos de
                            la visita y uso del sitio para motivos estadísticos.
                            Estos datos son anónimos y no se encuentran
                            vinculados a ningún dato que pueda identificarle. Al
                            registrarse en nuestra lista de correo para recibir
                            novedades, guardamos su dirección de correo
                            electrónico para poder contactarle ocasionalmente.
                            Si usted realiza una reserva o compra en nuestro
                            sitio web, recogemos datos identificativos de su
                            persona y de su pedido para poder proveerle de los
                            servicios requeridos, <i>inter alia</i> su nombre,
                            dirección postal, correo electrónico o producto
                            seleccionado. Si su pedido requiere de pago, los
                            datos de su forma de pago son enviados con una
                            conexión SSL encriptada y procesados por Stripe,
                            Inc., y sus filiales o empresas del grupo matriz.
                        </li>
                        <li>
                            Nébula: al utilizar nuestros dispositivos Nébula,
                            recogemos datos sobre los niveles de CO2,
                            temperatura, y otros indicadores, y los almacenamos
                            para que usted pueda acceder a ellos con
                            posterioridad a haberse medido. Usted también puede
                            configurar su dispositivo para que conozca el nombre
                            de la estancia, sus dimensiones u ocupancia, para
                            proveerle de análisis más preciso y detallado. Para
                            conocer con detalle qué datos son almacenados,
                            consulte la hoja de información del producto o los
                            términos de uso en el empaquetado original.
                        </li>
                        <li>
                            Neuralume Cloud: para poder proporcionarle acceso a
                            Neuralume Cloud (cloud.neuralume.com), utilizamos
                            cookies y tecnologías similares para poder proteger
                            sus datos con contraseña.
                        </li>
                    </ul>
                </Paragraph>
                <SubSectionHeading>
                    Comunicación de datos personales
                </SubSectionHeading>
                <Paragraph>
                    Los datos pueden ser comunicados a empresas relacionadas con
                    Neuralume para la prestación de los diversos servicios en
                    calidad de Encargados del Tratamiento. La empresa no
                    realizará ninguna cesión, salvo por obligación legal.
                </Paragraph>
                <SubSectionHeading>Información legal</SubSectionHeading>
                <Paragraph>
                    Los requisitos de esta Política complementan, y no
                    reemplazan, cualquier otro requisito existente bajo la ley
                    de protección de datos aplicable, que será la que prevalezca
                    en cualquier caso.
                </Paragraph>
                <Paragraph>
                    Esta Política está sujeta a revisiones periódicas y la
                    empresa puede modificarla en cualquier momento. Cuando esto
                    ocurra, le avisaremos de cualquier cambio y le pediremos que
                    vuelva a leer la versión más reciente de nuestra Política y
                    que confirme su aceptación.
                </Paragraph>
            </Container>
        </StandardView>
    );
};

export default LegalView;
