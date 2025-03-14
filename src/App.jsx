import { useRef, useState } from 'react';
import { Button, Container, Box, Typography, Paper, Fade, Dialog, DialogContent, IconButton, DialogActions } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import Invoice from './components/Invoice';
import InvoiceEditor from './components/InvoiceEditor';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import './App.css';

function App() {
  const [printing, setPrinting] = useState(false);
  const [create, setCreate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onBeforeGetContent: () => {
      setPrinting(true);
      setShowPreview(true);
    },
    onAfterPrint: () => {
      setPrinting(false);
      setShowPreview(false);
    },
  });

  const handleClosePreview = () => {
    setShowPreview(false);
    setPrinting(false);
  };

  const handleConfirmPrint = () => {
    handlePrint();
  };

  return (
    <Container maxWidth="lg" className="app">
      <Box sx={{ py: 4 }}>
        {create ? (
          <Fade in={true}>
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4 
              }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                  Invoice Generator
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={() => setShowPreview(true)}
                  disabled={printing}
                  sx={{ 
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Preview & Print
                </Button>
              </Box>
              
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                <InvoiceEditor />
              </Paper>
            </Box>
          </Fade>
        ) : (
          <Fade in={true}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '80vh',
              textAlign: 'center',
              gap: 3
            }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                Invoice Generator
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Create professional invoices in minutes
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setCreate(true)}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1.1rem'
                }}
              >
                Start Creating
              </Button>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            height: '90vh',
            maxHeight: '90vh',
            overflow: 'hidden',
            position: 'relative'
          }
        }}
      >
        <IconButton
          onClick={handleClosePreview}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'background.paper',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, height: '100%', overflow: 'auto' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Invoice Preview
            </Typography>
            <Invoice ref={ref} hidden={false} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClosePreview}
            disabled={printing}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleConfirmPrint}
            disabled={printing}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {printing ? 'Printing...' : 'Confirm & Print'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
