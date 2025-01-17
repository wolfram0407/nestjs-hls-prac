import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
} from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Post()
  create(@Body() createStreamingDto: CreateStreamingDto) {
    return this.streamingService.create(createStreamingDto);
  }

  @Get('start/:streamKey')
  startStreaming(@Res() res, @Param('streamKey') streamKey: string) {
    this.streamingService.startStreaming(streamKey);
    res.redirect('index.html');
    return { message: 'Streaming started', streamKey };
  }

  @Get('watch/:streamKey')
  @Render('index.html')
  watchStream(@Param('streamKey') streamKey: string) {
    return { streamKey };
  }

  @Get()
  findAll() {
    return this.streamingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStreamingDto: UpdateStreamingDto,
  ) {
    return this.streamingService.update(+id, updateStreamingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamingService.remove(+id);
  }
}
