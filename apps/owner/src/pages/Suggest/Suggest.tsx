import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BorderContainer, Calendar, Header, PageContainer, TimeSelect, TypeOneButton } from '@daeng-ggu/design-system';
import { format } from 'date-fns';

import TextEditor from '@/pages/Suggest/TextEditor.tsx';

import '@/styles/TextEditor.css';

interface ImageWithId {
  id: string;
  file: File;
}

const Suggest = () => {
  const location = useLocation();
  const { petId, desiredDateOne, desiredDateTwo, desiredDateThree, customerName, phone, address } =
    location.state || {};

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [textEditorValue, setTextEditorValue] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [, setImages] = useState<ImageWithId[]>([]);

  // Dummy IDs for demonstration; replace with actual IDs as needed.
  const customerId = 123;
  const designerId = 456; // Assuming a designerId is available or can be provided

  const desiredDates = [desiredDateOne, desiredDateTwo, desiredDateThree]
    .filter(Boolean)
    .map((dateString) => new Date(dateString));

  const desiredDatesSet = new Set(desiredDates.map((date) => format(date, 'yyyy-MM-dd')));

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;
    const selectedDateString = format(date, 'yyyy-MM-dd');
    if (!desiredDatesSet.has(selectedDateString)) return;

    if (selectedDate && format(selectedDate, 'yyyy-MM-dd') === selectedDateString) {
      setSelectedDate(null);
      setShowTimeSelect(false);
    } else {
      setSelectedDate(date);
      setSelectedTime(null);
      setShowTimeSelect(true);
    }
  };

  // Handle time selection
  const handleTimeSelectChange = (time: number) => {
    setSelectedTime(time);
  };

  // Get available times for selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');

    return desiredDates
      .filter((date) => format(date, 'yyyy-MM-dd') === selectedDateString)
      .map((date) => date.getHours());
  };

  const handleTextEditorChange = (content: string) => {
    setTextEditorValue(content);
  };

  const generateUniqueId = (index: number): string => {
    return `image-${index + 1}-${customerId}`;
  };

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called');

    if (!selectedDate || selectedTime === null || !price) {
      alert('다채우세여');
      return;
    }

    try {
      console.log('Original TextEditor Content:', textEditorValue);

      const parser = new DOMParser();
      const doc = parser.parseFromString(textEditorValue, 'text/html');
      const imgElements = doc.getElementsByTagName('img');
      const imagesWithIds: ImageWithId[] = [];
      let imageCounter = 0;

      for (let i = 0; i < imgElements.length; i++) {
        const img = imgElements[i];
        const src = img.getAttribute('src');
        if (src && src.startsWith('data:image')) {
          imageCounter += 1;
          const uniqueId = generateUniqueId(i);

          img.setAttribute('src', uniqueId);
          const file = base64ToFile(src, `image-${imageCounter}.png`); // Adjust extension based on MIME type if needed
          imagesWithIds.push({ id: uniqueId, file });
          console.log(`Processed Image ${i + 1}:`, {
            id: uniqueId,
            fileName: file.name,
            fileType: file.type,
          });
        }
      }

      const serializer = new XMLSerializer();
      const processedContent = serializer.serializeToString(doc.body);

      setImages(imagesWithIds);

      const estimateRequest = {
        requestId: petId || 0,
        customerId,
        designerId,
        requestDetail: processedContent,
        requestDate: `${format(selectedDate, 'yyyy-MM-dd')} ${String(selectedTime).padStart(2, '0')}:00:00`,
        requestPrice: price || 0,
      };
      console.log('Estimate Request Object:', estimateRequest);

      const estimateImgList = imagesWithIds.map((image) => ({
        id: image.id,
        estimateImgUrl: image.file,
      }));

      console.log('Estimate Image List:', estimateImgList);

      const formData = new FormData();
      formData.append('estimateRequest', new Blob([JSON.stringify(estimateRequest)], { type: 'application/json' }));

      // Append images
      estimateImgList.forEach((img, index) => {
        formData.append(`estimateImgList[${index}].id`, img.id);
        formData.append(`estimateImgList[${index}].estimateImgUrl`, img.estimateImgUrl);
      });

      for (const pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`${pair[0]}: File - ${pair[1].name}, Type: ${pair[1].type}`);
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }

      // Send the POST request
      const response = await fetch('http://localhost:8080/daengggu/bid/estimate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('제안하기 성공:', result);
      alert('견적 제안이 성공적으로 제출되었습니다.');

      // Optionally, reset the form or navigate the user
      // Reset form fields
      setTextEditorValue('');
      setPrice('');
      setSelectedDate(null);
      setSelectedTime(null);
      setImages([]);
    } catch (error) {
      console.error('제안하기 실패:', error);
      alert('견적 제안 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div className='mb-6 max-w-[480px]'>
        <Header
          mode='customBack'
          title='견적 제안하기'
          onClick={() => {
            window.history.back();
          }}
        />
      </div>
      <PageContainer>
        <div className='mt-10'>
          <div className='items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>제안서 상세</h2>
          </div>
          <div className='mb-16 w-full'>
            <BorderContainer innerPadding='p-3'>
              <TextEditor onChange={handleTextEditorChange} />
            </BorderContainer>
          </div>

          <div className='items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>견적서 설정</h2>
          </div>
          <div className='mb-14 h-full w-full'>
            <BorderContainer>
              <div className='w-full bg-secondary'>
                <div>
                  <div className='rounded-[8px] bg-white'>
                    <Calendar
                      mode='single'
                      selected={selectedDate || undefined}
                      onSelect={handleDateClick}
                      disabled={(date) => {
                        const dateString = format(date, 'yyyy-MM-dd');
                        return !desiredDatesSet.has(dateString);
                      }}
                    />
                  </div>
                </div>

                <div
                  className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    showTimeSelect ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='w-full bg-secondary'>
                    <div className='flex justify-center rounded-[8px] bg-white py-4'>
                      <TimeSelect
                        availableTimes={getAvailableTimes()}
                        selectValue={selectedTime}
                        onSelectChange={handleTimeSelectChange}
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-6 w-full bg-secondary'>
                  <div>
                    <div className='flex flex-col justify-center rounded-[8px] bg-white py-4 pl-6'>
                      <div className='text-sub_h2 font-bold'>가격입력</div>
                      <div className='mt-3 flex items-center text-sub_h1'>
                        <div>
                          <input
                            className='w-full border-b focus:outline-none'
                            placeholder='₩ 가격'
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                          />
                        </div>
                        <span className='ml-2'>원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BorderContainer>
          </div>

          <div className='mb-56 w-full'>
            <div className='mt-6 items-start'>
              <h2 className='mb-4 text-h3 font-bold text-gray-800'>댕송지 정보</h2>
            </div>
            <BorderContainer innerPadding='p-3'>
              <div className='flex-col items-start p-2 text-gray-800'>
                <p className='text-sub_h2 font-bold'>{customerName || '정보 없음'}</p>
                <p className='text-body3 font-bold text-gray-800'>{phone || '정보 없음'}</p>
                <p className='pt-1 text-caption'>{address || '정보 없음'}</p>
              </div>
            </BorderContainer>
          </div>
        </div>
      </PageContainer>

      <div className='fixed w-full' style={{ bottom: '65px' }}>
        <TypeOneButton text='제안하기' color='bg-secondary' onClick={handleSubmit} />
        <div className='fixed w-full' style={{ bottom: '7.5rem' }}>
          <TypeOneButton text='제안하기' color='bg-secondary' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Suggest;
