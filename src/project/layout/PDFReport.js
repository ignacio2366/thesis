import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import style from "../../components/styles";
import regular from "../../fonts/Poppins Regular 400.ttf";
Font.register({
  family: "Regular",
  src: regular,
});

const MyPdf = ({
  month,
  newspublished,
  forpublication,
  totalnews,
  totalvisited,
  line,
  positve,
  negative,
  neutral,
  headline,
}) => {
  const styles = StyleSheet.create({
    columns: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "space-between",
      margin: "4px 10px",
    },
    tableCellHeader: {
      width: "100%",
      border: "1px solid red",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      alignItems: "center",
    },
    card: {
      width: "140px",
      height: "35px",
      fontSize: "10px",
      backgroundColor: "#212D3C",
      color: "#ffff",
      borderRadius: "2px",
      display: "flex",
      justifyContent: "center",
      alignItems: "space-between",
      padding: "10px",
      fontFamily: "Regular",
      margin: "4px",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 10,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      marginBottom: 5,
      fontSize: 10,
      padding: 5,
      textAlign: "center",
      flexGrow: 1,
    },
    tableHeader: {
      backgroundColor: "#bfbfbf",
      color: "#707070",
    },
  });
  return (
    <div>
      <PDFDownloadLink
        document={
          <>
            <Document>
              <Page size="A4">
                <View style={style.column}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "black",
                      textAlign: "left",
                      margin: "5px",
                      fontFamily: "Regular",
                    }}
                  >
                    Media Monitoring Analysis of Month:{month}
                  </Text>
                  <View style={[styles.row, { flexWrap: "wrap" }]}>
                    <Text style={styles.card}>
                      News Publshed: {newspublished}
                    </Text>
                    <Text style={styles.card}>
                      For Publication: {forpublication}
                    </Text>
                    <Text style={[styles.card, { backgroundColor: "#616B7D" }]}>
                      Overall News: {totalnews}
                    </Text>
                    <Text style={[styles.card, { backgroundColor: "#616B7D" }]}>
                      Monthly Visitors: {totalvisited}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "left",
                        marginTop: "5px",
                      }}
                    >
                      Sentiment Analysis Graph of News
                    </Text>
                  </View>
                  <View style={[styles.row, { flexWrap: "wrap" }]}>
                    <Text style={[styles.card, { backgroundColor: "#4BC0C0" }]}>
                      Positive News: {positve}
                    </Text>
                    <Text
                      style={[
                        styles.card,
                        {
                          backgroundColor: "rgb(255, 205, 86)",
                          fontFamily: "Regular",
                        },
                      ]}
                    >
                      Neutral News: {neutral}
                    </Text>
                    <Text style={[styles.card, { backgroundColor: "#FF6384" }]}>
                      Negative News: {negative}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "black",
                      textAlign: "left",
                      margin: "5px",
                      marginTop: "10px",
                      fontFamily: "Regular",
                    }}
                  >
                    Most Headline Engagement in this Month
                  </Text>
                  <View
                    style={{
                      width: "98%",
                      height: "auto",
                      border: "0.5px solid gray",
                      fontSize: "10px",
                      margin: "5px auto",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          width: "100%",
                          height: "auto",
                          textAlign: "center",
                          fontWeight: "black",
                          border: "0.5px solid black",
                          backgroundColor: "#FD5353",
                          color: "white",
                          fontFamily: "Regular",
                        }}
                      >
                        Headlne
                      </Text>
                      <Text
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontWeight: "black",
                          border: "0.5px solid black",
                          backgroundColor: "#FD5353",
                          color: "white",
                          fontFamily: "Regular",
                        }}
                      >
                        Category
                      </Text>
                      <Text
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontWeight: "black",
                          border: "0.5px solid black",
                          backgroundColor: "#FD5353",
                          color: "white",
                          fontFamily: "Regular",
                        }}
                      >
                        Date
                      </Text>
                      <Text
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontWeight: "black",
                          border: "0.5px solid black",
                          backgroundColor: "#FD5353",
                          color: "white",
                          fontFamily: "Regular",
                        }}
                      >
                        Visitor
                      </Text>
                    </View>
                    {headline.map((item, index) => (
                      <View
                        style={{ display: "flex", flexDirection: "row" }}
                        key={index}
                      >
                        <Text
                          style={{
                            width: "100%",
                            height: "auto",
                            padding: "1px",
                            textAlign: "center",
                            fontWeight: "black",
                            border: "1px solid gray",
                            fontFamily: "Regular",
                          }}
                        >
                          {item.headline}
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                            padding: "1px",
                            height: "auto",

                            textAlign: "center",
                            fontWeight: "black",
                            border: "1px solid gray",
                            fontFamily: "Regular",
                          }}
                        >
                          {item.category}
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                            padding: "1px",
                            height: "auto",

                            textAlign: "center",
                            fontWeight: "black",
                            border: "1px solid gray",
                            fontFamily: "Regular",
                          }}
                        >
                          {item.date}
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                            padding: "1px",
                            height: "auto",

                            textAlign: "center",
                            fontWeight: "black",
                            border: "1px solid gray",
                            fontFamily: "Regular",
                          }}
                        >
                          {item.visitor}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Page>
              <Page>
                <View style={styles.column}>
                  <View
                    style={{
                      width: "100%",
                      height: "auto",
                      border: "0.5px solid gray",
                      fontSize: "10px",
                      margin: "5px 0px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "left",
                        margin: "5px",
                        marginTop: "10px",
                        fontFamily: "Regular",
                      }}
                    >
                      Daily News Engagement
                    </Text>

                    <View
                      style={{
                        width: "50%",
                        height: "auto",
                        border: "0.5px solid gray",
                        fontSize: "10px",
                        margin: "5px auto",
                      }}
                    >
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontWeight: "black",
                            border: "0.5px solid black",
                            backgroundColor: "#FD5353",
                            color: "white",
                            fontFamily: "Regular",
                          }}
                        >
                          Day
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontWeight: "black",
                            border: "0.5px solid black",
                            backgroundColor: "#FD5353",
                            color: "white",
                            fontFamily: "Regular",
                          }}
                        >
                          Count
                        </Text>
                      </View>
                      {line.map((item, index) => (
                        <View
                          style={{ display: "flex", flexDirection: "row" }}
                          key={index}
                        >
                          <Text
                            style={{
                              width: "100%",
                              height: "auto",
                              padding: "1px",
                              textAlign: "center",
                              fontWeight: "black",
                              border: "1px solid gray",
                              fontFamily: "Regular",
                            }}
                          >
                            {item.day} day
                          </Text>
                          <Text
                            style={{
                              width: "100%",
                              padding: "1px",
                              height: "auto",

                              textAlign: "center",
                              fontWeight: "black",
                              border: "1px solid gray",
                              fontFamily: "Regular",
                            }}
                          >
                            {item.count} count
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </>
        }
        fileName={"Monthly Report of " + month}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Report"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default MyPdf;
