<?php if(!defined('myweb')){ exit(); }?>
<?php  

$link_list = $www.'alternatif';
$link_update = $www.'alternatif_update';

if(isset($_POST['delete']) and isset($_POST['id'])){
	$id = $_POST['id'];
	mysqli_query($con, "DELETE FROM alternatif WHERE id_alternatif = '".escape($id)."'");
	die;
}
$kriteria = array();
$q = $con->query("SELECT * FROM kriteria ORDER BY kode");
while($h = $q->fetch_array()){
	$kriteria[] = array('id'=>$h['id_kriteria'], 'nama'=>htmlspecialchars($h['nama']));
}
$cluster = array();
$nama_cluster = array();
$q = $con->query("SELECT * FROM cluster ORDER BY kode");
while($h = $q->fetch_array()){
	$cluster[] = array('id'=>$h['id_cluster'], 'nama'=>htmlspecialchars($h['nama']));
	$nama_cluster[$h['id_cluster']] = htmlspecialchars($h['nama']);
}
$nilai_kriteria = array();
$q = $con->query("SELECT * FROM nilai_kriteria");
while($h = $q->fetch_array()){
	$nilai_kriteria[$h['id_alternatif']][$h['id_kriteria']] = $h['nilai'];
}
$center_points = array();
$q = $con->query("SELECT * FROM center_points");
while($h = $q->fetch_array()){
	$center_points[$h['id_cluster']][$h['id_kriteria']] = $h['nilai'];
}

$alternatif = array();
$nilai_dataset = array();
$daftar_dataset = '';
$q = $con->query("SELECT * FROM alternatif ORDER BY id_alternatif");
while($h = $q->fetch_array()){
	$id = $h['id_alternatif'];
	$alternatif[] = $h['id_alternatif'];
	
	$daftar_dataset .= '
	  <tr>
		<td class="text-center"></td>
		<td class="text-nowrap">'.htmlspecialchars($h['kode']).'</td>
		<td class="text-nowrap">'.htmlspecialchars($h['nama']).'</td>';
	foreach ($kriteria as $key => $value) {
		$nilai = '';
		if(isset($nilai_kriteria[$id][$value['id']])){
			$nilai = $nilai_kriteria[$id][$value['id']];
		}
		$nilai_dataset[$id][$value['id']] = (float)$nilai;
		$daftar_dataset .= '<td class="text-center">'.htmlspecialchars($nilai).'</td>';
	}
	$daftar_dataset .= '
	  </tr>
	';
}

$nilai_center_points = array();
$daftar_center_points = '';
$q = $con->query("SELECT * FROM cluster ORDER BY id_cluster");
while($h = $q->fetch_array()){
	$id = $h['id_cluster'];
	
	$daftar_center_points .= '
	  <tr>
		<td class="text-center"></td>
		<td class="text-nowrap">'.htmlspecialchars($h['kode']).'</td>
		<td class="text-nowrap">'.htmlspecialchars($h['nama']).'</td>';
	foreach ($kriteria as $key => $value) {
		$nilai = '';
		if(isset($center_points[$id][$value['id']])){
			$nilai = $center_points[$id][$value['id']];
		}
		$nilai_center_points[$id][$value['id']] = (float)$nilai;
		$daftar_center_points .= '<td class="text-center">'.htmlspecialchars($nilai).'</td>';
	}
	$daftar_center_points .= '
	  </tr>
	';
}

$alternatif_cluster = array();
$daftar_iterasi_1 = '';
$q = $con->query("SELECT * FROM alternatif ORDER BY id_alternatif");
while($h = $q->fetch_array()){
	$id_alternatif = $h['id_alternatif'];
	
	$daftar_iterasi_1 .= '
	<tr>
	<td class="text-center"></td>
	<td class="text-nowrap">'.htmlspecialchars($h['kode']).'</td>
	<td class="text-nowrap">'.htmlspecialchars($h['nama']).'</td>';
	$id_cluster_min = '';
	$cluster_min = '';
	$nilai_min = 0;
	foreach ($cluster as $key => $value) {
		$id_cluster = $value['id'];
		$nilai = 0;
		foreach ($kriteria as $key2 => $value2) {
			$id_kriteria = $value2['id'];
			$nilai = $nilai + pow($nilai_dataset[$id_alternatif][$id_kriteria] - $nilai_center_points[$id_cluster][$id_kriteria], 2);
		}
		$nilai = pow($nilai, 0.5);
		if($key == 0){
			$id_cluster_min = $id_cluster;
			$cluster_min = $value['nama'];
			$nilai_min = $nilai;
		}else{
			if($nilai < $nilai_min){
				$id_cluster_min = $id_cluster;
				$cluster_min = $value['nama'];
				$nilai_min = $nilai;
			}
		}
		$daftar_iterasi_1 .= '<td class="text-center">'.round($nilai, 2).'</td>';
	}
	$alternatif_cluster[$id_alternatif] = $id_cluster_min;
	$daftar_iterasi_1 .= '
	<td class="text-center">'.$cluster_min.'</td>
	</tr>
	';
}

$nilai_center_points_2 = array();
$daftar_center_points_2 = '';
$q = $con->query("SELECT * FROM cluster ORDER BY id_cluster");
while($h = $q->fetch_array()){
	$id_cluster = $h['id_cluster'];
	
	$daftar_center_points_2 .= '
	  <tr>
		<td class="text-center"></td>
		<td class="text-nowrap">'.htmlspecialchars($h['kode']).'</td>
		<td class="text-nowrap">'.htmlspecialchars($h['nama']).'</td>';
	foreach ($kriteria as $key => $value) {
		$id_kriteria = $value['id'];
		$nilai = 0;
		$c = 0;
		foreach ($alternatif as $key2 => $id_alternatif) {
			if($alternatif_cluster[$id_alternatif] == $id_cluster){
				$nilai = $nilai + $nilai_dataset[$id_alternatif][$id_kriteria];
				$c++;
			}
		}
		$nilai = round($nilai / $c, 2);
		$nilai_center_points_2[$id_cluster][$value['id']] = (float)$nilai;
		$daftar_center_points_2 .= '<td class="text-center">'.htmlspecialchars($nilai).'</td>';
	}
	$daftar_center_points_2 .= '
	  </tr>
	';
}

$alternatif_cluster_2 = array();
$daftar_iterasi_2 = '';
$q = $con->query("SELECT * FROM alternatif ORDER BY id_alternatif");
while($h = $q->fetch_array()){
	$id_alternatif = $h['id_alternatif'];
	
	$daftar_iterasi_2 .= '
	<tr>
	<td class="text-center"></td>
	<td class="text-nowrap">'.htmlspecialchars($h['kode']).'</td>
	<td class="text-nowrap">'.htmlspecialchars($h['nama']).'</td>';
	$id_cluster_min = '';
	$cluster_min = '';
	$nilai_min = 0;
	foreach ($cluster as $key => $value) {
		$id_cluster = $value['id'];
		$nilai = 0;
		foreach ($kriteria as $key2 => $value2) {
			$id_kriteria = $value2['id'];
			$nilai = $nilai + pow($nilai_dataset[$id_alternatif][$id_kriteria] - $nilai_center_points_2[$id_cluster][$id_kriteria], 2);
		}
		$nilai = pow($nilai, 0.5);
		if($key == 0){
			$id_cluster_min = $id_cluster;
			$cluster_min = $value['nama'];
			$nilai_min = $nilai;
		}else{
			if($nilai < $nilai_min){
				$id_cluster_min = $id_cluster;
				$cluster_min = $value['nama'];
				$nilai_min = $nilai;
			}
		}
		$daftar_iterasi_2 .= '<td class="text-center">'.round($nilai, 2).'</td>';
	}
	$alternatif_cluster_2[$id_alternatif] = $id_cluster_min;
	$daftar_iterasi_2 .= '
	<td class="text-center">'.$cluster_min.'</td>
	</tr>
	';
}
$daftar_hasil = '';
$q = $con->query("SELECT * FROM alternatif ORDER BY id_alternatif");
while($h = $q->fetch_array()){
	$id = $h['id_alternatif'];
	$alternatif[] = $h['id_alternatif'];
	
	$daftar_hasil .= '
	<tr>
	<td class="text-center"></td>
	<td class="text-nowrap">'.htmlspecialchars($h['kode']).'</td>
	<td class="text-nowrap">'.htmlspecialchars($h['nama']).'</td>';
	foreach ($kriteria as $key => $value) {
		$nilai = '';
		if(isset($nilai_kriteria[$id][$value['id']])){
			$nilai = $nilai_kriteria[$id][$value['id']];
		}
		$daftar_hasil .= '<td class="text-center">'.htmlspecialchars($nilai).'</td>';
	}
	$daftar_hasil .= '
	<td class="text-center">'.$nama_cluster[$alternatif_cluster_2[$id]].'</td>
	</tr>
	';
}

?>
<div class="content-wrapper">
	<div class="row">
		<div class="col-12">
			<div class="content-header">Hasil Clustering</div>
		</div>
	</div>
	<section>
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-header">
			            <h4 class="card-title">Dataset</h4>
					</div>
					<div class="card-content">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-striped table-bordered" id="tabel_dataset">
									<thead>
										<tr>
											<th width="40">NO</th>
											<th>KODE</th>
											<th>NAMA</th>
											<?php  
											foreach ($kriteria as $key => $value) {
												echo '<th class="text-center">'.strtoupper($value['nama']).'</th>';
											}
											?>
										</tr>
									</thead>
									<tbody>
										<?php echo $daftar_dataset;?>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
			            <h4 class="card-title">Center Points</h4>
					</div>
					<div class="card-content">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-striped table-bordered" id="tabel_center_points">
									<thead>
										<tr>
											<th width="40">NO</th>
											<th>KODE</th>
											<th>NAMA</th>
											<?php  
											foreach ($kriteria as $key => $value) {
												echo '<th class="text-center">'.strtoupper($value['nama']).'</th>';
											}
											?>
										</tr>
									</thead>
									<tbody>
										<?php echo $daftar_center_points;?>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
			            <h4 class="card-title">Iterasi 1</h4>
					</div>
					<div class="card-content">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-striped table-bordered" id="tabel_iterasi_1">
									<thead>
										<tr>
											<th width="40">NO</th>
											<th>KODE</th>
											<th>NAMA</th>
											<?php  
											foreach ($cluster as $key => $value) {
												echo '<th class="text-center">'.strtoupper($value['nama']).'</th>';
											}
											?>
											<th>CLUSTER</th>
										</tr>
									</thead>
									<tbody>
										<?php echo $daftar_iterasi_1;?>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
			            <h4 class="card-title">Center Points 2</h4>
					</div>
					<div class="card-content">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-striped table-bordered" id="tabel_center_points_2">
									<thead>
										<tr>
											<th width="40">NO</th>
											<th>KODE</th>
											<th>NAMA</th>
											<?php  
											foreach ($kriteria as $key => $value) {
												echo '<th class="text-center">'.strtoupper($value['nama']).'</th>';
											}
											?>
										</tr>
									</thead>
									<tbody>
										<?php echo $daftar_center_points_2;?>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
			            <h4 class="card-title">Iterasi 2</h4>
					</div>
					<div class="card-content">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-striped table-bordered" id="tabel_iterasi_2">
									<thead>
										<tr>
											<th width="40">NO</th>
											<th>KODE</th>
											<th>NAMA</th>
											<?php  
											foreach ($cluster as $key => $value) {
												echo '<th class="text-center">'.strtoupper($value['nama']).'</th>';
											}
											?>
											<th>CLUSTER</th>
										</tr>
									</thead>
									<tbody>
										<?php echo $daftar_iterasi_2;?>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
			            <h4 class="card-title">Hasil Akhir</h4>
					</div>
					<div class="card-content">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-striped table-bordered" id="tabel_hasil">
									<thead>
										<tr>
											<th width="40">NO</th>
											<th>KODE</th>
											<th>NAMA</th>
											<?php  
											foreach ($kriteria as $key => $value) {
												echo '<th class="text-center">'.strtoupper($value['nama']).'</th>';
											}
											?>
											<th>HASIL</th>
										</tr>
									</thead>
									<tbody>
										<?php echo $daftar_hasil;?>
									</tbody>
								</table>

							</div>
						</div>
					</div>
				</div>






			</div>
		</div>
	</section>


</div>
<script type="text/javascript">
$(document).ready(function () {
    var t = $('#tabel_dataset').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": [0]
        } ],
        "order": [[ 1, 'asc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var t = $('#tabel_center_points').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": [0]
        } ],
        "order": [[ 1, 'asc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var t = $('#tabel_iterasi_1').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": [0]
        } ],
        "order": [[ 1, 'asc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var t = $('#tabel_center_points_2').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": [0]
        } ],
        "order": [[ 1, 'asc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var t = $('#tabel_iterasi_2').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": [0]
        } ],
        "order": [[ 1, 'asc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
    var t = $('#tabel_hasil').DataTable( {
        "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": [0]
        } ],
        "order": [[ 1, 'asc' ]]
    } );
 
    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

	$("#tabel").on("click", ".btn_delete", function(){
		var id = $(this).data('id');
		Swal.fire({
			text: "Anda yakin akan menghapus data ini ?",
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Ya',
			cancelButtonText: 'Batal',
			customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-danger" },
		}).then((result) => {
			if (result.isConfirmed) {
				data = [];
				data.push({'name': 'id', 'value': id});
				data.push({'name': 'delete', 'value': 'true'});
				$.post('<?php echo $link_list; ?>', data, function(result){

					Swal.fire({
						position: 'top-center',
						icon: 'success',
						text: 'Data berhasil dihapus',
						showConfirmButton: false,
						timer: 1500
					}).then((result) => {
						location.reload();
					})
					
				});
			}
		})		
		return false;
	});



})
</script>