import { makeStyles } from '@mui/styles';


export const useBodyStyles = () =>
    makeStyles(
        () => ({
            root: {
                width: '100vW',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: '100vH',
            }
        }),
        { index: 1 },
    );

export const useMainPageStyles = makeStyles(
    {
        root: {

        },
        mainPagePaper: {
            padding: '1.5em',
            minHeight: 'calc(100vH - 130px)',
        },
        testBorder:{
            //border:'2px solid black'
        }
    }
)

export const useResultPageStyles = makeStyles(
    {
        root: {

        },
        pagePaper: {
            padding: '1.5em',
            minHeight: 'calc(100vH - 130px)',
        },
        testBorder:{
            border:'2px solid black'
        },
    }
)

export const useHistoryPageStyles = makeStyles(
    {
        root: {

        },
        pagePaper: {
            padding: '1.5em',
            minHeight: 'calc(100vH - 130px)',
        },
        testBorder:{
            border:'2px solid black'
        }
    }
)

export const useNavStyles = makeStyles({
    root: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
    },
    menuButton: {
        textTransform: 'inherit',
        size: '24px',
        fontSize: '12pt',
        color: '#ffffff',
        textAlign:'right'
    },
    appBar: {
        paddingTop: '0.2em',
        paddingBottom: '0.2em',
        color: '#ffffff',
        backgroundColor:'#ffffff'
    },
    iconButton: {
        color: '#ffffff',
        textTransform: 'inherit',
        size: '24px',
        fontSize: '12pt',
        padding: '0.35em',
    },
});

